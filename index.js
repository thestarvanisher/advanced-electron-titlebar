//const DEFAULT_BCKG_COLOR = "";

/**
 * The Titlebar class creates a modern looking titlebar for an electron window.
 * @constructor
 * @param {Object[]} settings - The settings for the titlebar
 * @param {Object[]} menu - The menu structure for the menu on the titlebar
 */
class Titlebar {
    constructor() {
        window.$ = require("jquery")
        this.settings = null;
        this.menu = null;
        this.params = {
            backgroundColor: "#484848",
            fontColor: "#D3D3D3",
            buttonsFont: "Arial",
            menuButtonsColor: "#484848",
            buttonHoverColor: "#686868",
            submenuColor: "#686868",
            submenuButtonColor: "#686868",
            submenuButtonHoverColor: "#484848",
            windowButtonColor: "#484848",
            windowButtonHoverColor: "#686868",
            closeButtonHoverColor: "firebrick",
            titlebarLabelFont: "Impact",
            titlebarLabelColor: "#D3D3D3",
            titlebarLabelSize: 16,

            // In use but currently not meant for users to change
            defaultChevronRight: '<i class="fas fa-chevron-right"></i>',
            minimumNumberMenuButtons: 3,
            
            //Currently not in use
            icon: null,
        };
        this.buttonTypes = {
            standard: "standard",
            submenu: "submenu",
        },
        this.buttonPositions = [],
        this.electronWindow = null;
    }

    /**
     * Get the window size
     * @returns The window's size
     */
    getWindowSize() {
        let window_size = []
        window_size.push($(window).width());
        window_size.push($(window).height());

        return window_size;
    }

    /**
     * Create the titlebar, the menu, the title label and the 
     * window buttons
     */
    createTitlebar() {
        this.setParams();
        this.makeRequiredStyleChanges();
        this.makeTitlebar();
        this.makeTitlebarZones();
        this.makeMenu();
        this.calculateButtonPositions();
        this.makeTitle();
        this.makeWindowButtons();
        this.addAdditionalEventListeners();
    }

    /**
     * Sets the parameters for the titlebar
     */
    setParams() {
        for(let key in this.settings) {
            if(key in this.params) {
                this.params[key] = this.settings[key];
            }
        }
    }

    /**
     * Changes the stle of some elements which is required
     * for the titlebar to work properly
     */
    makeRequiredStyleChanges() {
        $("body").css({
            "margin": "0",
            "padding": "0",
        });
    }

    /**
     * Creates the titlebar
     */
    makeTitlebar() {
        let titlebar = document.createElement("div");
        $(titlebar).attr({"id": "ect-titlebar"});
        $(titlebar).css({
            "display": "none",
            "background-color": this.params.backgroundColor,
            "width": "100%",
            "height": "30px",
            "line-height": "30px",
            "display": "flex",
            "-webkit-user-select": "none",
            "color": this.params.fontColor,
            
        });
        $("body").prepend(titlebar);
    }

    /*makeScrollbar() {

    }*/

    /**
     * Creates the titlebar zones. For now they are three - the left, center and right.
     * The left zone holds the menu buttons. The center holds the window title. The 
     * right zone holds the window buttons.
     */
    makeTitlebarZones() {
        let left_zone = document.createElement("div");
        $(left_zone).attr({"class": "ect-titlebar_panel ect-t_p_left"});
        $(left_zone).css({
            //"font-family": this.params.buttonsFont,
            //"font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "white-space": "nowrap"
        });

        let center_zone = document.createElement("div");
        $(center_zone).attr({"class": "ect-titlebar_panel ect-t_p_center"});
        $(center_zone).css({
            "font-family": this.params.buttonsFont,
            "font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "flex": "2",
            "text-align": "center",
            "-webkit-app-region": "drag",
            "min-width": "100px",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "overflow": "hidden"
        });

        let right_zone = document.createElement("div");
        $(right_zone).attr({"class": "ect-titlebar_panel ect-t_right"});
        $(right_zone).css({
            "font-family": this.params.buttonsFont,
            "font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "white-space": "nowrap"
        });

        $("#ect-titlebar").append([left_zone, center_zone, right_zone]);
    }

    /**
     * Creates a menu button together with its parent
     * @param text - The text on the button
     * @returns {Element} The element that contains the button on the titlebar
     */
    makeMenuButton(text) {
        let menu_buton_outer = document.createElement("div");
        $(menu_buton_outer).attr({"class": "ect-b_group"});
        $(menu_buton_outer).css({
            "display": "inline-block",
            "float": "left",
        });

        let menu_button = document.createElement("button");
        $(menu_button).attr({"class": "ect-menu_b"});
        $(menu_button).css({
            "display": "inline-block",
            "border": "none",
            "height": "30px",
            "padding-left": "10px",
            "padding-right": "10px",
            "color": this.params.fontColor,
            "font-size": "14px",
            "font-family": this.params.buttonsFont,
            "background-color": this.params.menuButtonsColor,
            "outline": "none",
            "cursor": "pointer"
        });

        let obj = this;

        $(menu_button).hover(function() {
            $(this).css({"background-color": obj.params.buttonHoverColor});
        });

        $(menu_button).mouseleave(function() {
            $(this).css({"background-color": obj.params.menuButtonsColor});
        });

        $(menu_button).click(function(event) {
            event.stopPropagation();
            $(".ect-submenu").hide();
            $(this).parent().children(".ect-submenu").first().children("ul").first().children("li").css({
                "max-width": ("calc(" + (obj.getWindowSize()[0] - $(this)[0].getBoundingClientRect().x) + "px - 40px)"),
                "display": "flex",
                "overflow": "hidden",
            })
            $(this).parent().children(".ect-submenu").first().css("display", "block");
        });


        $(menu_button).text(text);
        $(menu_buton_outer).append(menu_button);
        return menu_buton_outer;
    }

    /**
     * Creates a submenu
     * @returns {Element} The submenu
     */
    makeSubmenu() {
        let submenu = document.createElement("div");
        $(submenu).attr({"class": "ect-submenu"});
        $(submenu).css({
            "position": "absolute",
            "display": "none",
            "min-width": "200px",
            "max-height": "calc(100vh - 30px)",
            "overflow-y": "auto",
            "line-height": "normal",
            "font-family": "Arial",
            "font-size": "14px",
            "cursor": "pointer",
            "background-color": this.params.submenuColor,
            "-webkit-box-shadow": "3px 3px 12px -2px rgba(0,0,0,0.75)"
        });

        let submenu_ul = document.createElement("ul");
        $(submenu_ul).css({
            "list-style-type": "none",
            "padding": "0",
            "margin": "5px 0px"
        });
        $(submenu).append(submenu_ul);

        return submenu;
    }

    /** 
     * Creates a submenu or subsubmenu button
     * @param {String} text - The text displayed on the button
     * @param {Element} btn - The submenu object
     * @param {boolean} opens_submenu - A flag that indicates if the button opens a submenu (true) or not (false)
     * @param {boolean} hidden_at_first - A flag that indicates if the submenu button is hidden at the beginning (true) or not (false)
     * @returns {Element} The submenu button
     */
    makeSubmenuButton(text, btn, opens_submenu, hidden_at_first) {
        let subbutton = document.createElement("li");
        $(subbutton).css({
            "background-color": this.params.submenuButtonColor,
            "padding": "5px 20px",
            "display": "flex",
            "overflow": "hidden"
        });

        let subbutton_left_text = document.createElement("span");
        $(subbutton_left_text).attr({"class": "ect-submenu_option"});
        $(subbutton_left_text).css({
            "white-space": "nowrap",
            "text-overflow": "ellipsis",
            "padding-right": "10px",
            "overflow": "hidden",
            "flex": "2",
        });

        $(subbutton_left_text).text(text);
        
        let subbutton_right_text = document.createElement("span");
        $(subbutton_right_text).attr({"class": "ect-submenu_option_command"});
        $(subbutton_right_text).css({
            "float": "right"
        });


        if(opens_submenu) {
            $(subbutton_right_text).html(this.params.defaultChevronRight);

            let obj = this;
            $(subbutton).hover(function(event) {
                $(this).css({
                    "background-color": obj.params.submenuButtonHoverColor,
                });

                let subsubmenu = $(this).children(".ect-subsubmenu").first();
                let left_offset = $(this)[0].getBoundingClientRect().x;
                let top_offset = $(this)[0].getBoundingClientRect().y;
                let outer_width = $(this).outerWidth();
                let subsubmenu_outer_width = $(subsubmenu).outerWidth();
                let subsubmenu_outer_height = $(subsubmenu).outerHeight();
                let window_size = obj.getWindowSize();

                $(subsubmenu).children("ul").first().children("li").css({
                    "max-width": "none"
                });

                if(left_offset + outer_width + subsubmenu_outer_width > window_size[0]) {
                    if(subsubmenu_outer_width > window_size[0] - (left_offset + 10)) {
                        if(window_size[0] > subsubmenu_outer_width) {
                            $(subsubmenu).css({
                                "display": "inline-block",
                                "left": ("" + (window_size[0] - subsubmenu_outer_width) + "px"),
                                "top": ("" + top_offset + "px")
                            });
                        }
                        else {
                            $(subsubmenu).css({
                                "display": "inline-block",
                                "left": ("0" + "px"),
                                "top": ("" + top_offset + "px"),
                            });
                            $(subsubmenu).children("ul").first().children("li").css({
                                "max-width": ("calc(" + window_size[0] + "px - 40px)")
                            });
                        }
                    }
                    else {
                        $(subsubmenu).css({
                            "display": "inline-block",
                            "left": ("" + (left_offset + 10) + "px"),
                            "top": ("" + top_offset + "px")
                        });
                    } 
                }
                else {
                    $(subsubmenu).css({
                        "display": "inline-block",
                        "left": ("" + (left_offset + outer_width) + "px"),
                        "top": ("" + top_offset + "px")
                    });
                }

                $(subsubmenu).css("max-height", "none");

                subsubmenu_outer_height = $(subsubmenu).outerHeight();

                if(top_offset + subsubmenu_outer_height > window_size[1]) {
                    let dist_top = top_offset - (top_offset + subsubmenu_outer_height - window_size[1]);
                    if(dist_top < 30) {
                        dist_top = 30;
                    }

                    $(subsubmenu).css({
                        "top": ("" + dist_top + "px"),
                        "max-height": ("" + (window_size[1] - 30) + "px"),
                    });
                }   
                else {
                    $(subsubmenu).css({
                        "max-height": "none",
                    });
                }
            });
    
            $(subbutton).mouseleave(function() {
                $(this).css({
                    "background-color": obj.params.submenuButtonColor,
                });

                let subsubmenu = $(this).children(".ect-subsubmenu").first();
                $(subsubmenu).css("display", "none");
            });
        }
        else {
            $(subbutton_right_text).text(btn.command);

            let obj = this;
            $(subbutton).hover(function() {
                $(this).css({
                    "background-color": obj.params.submenuButtonHoverColor,
                });
            });
    
            $(subbutton).mouseleave(function() {
                $(this).css({
                    "background-color": obj.params.submenuButtonColor,
                });
            });
            
            $(subbutton).click(btn.method);
        }

        $(subbutton).append([subbutton_left_text, subbutton_right_text]);

        return subbutton;
    }

    /**
     * Creates a subsubmenu
     * @returns {Element} The subsubmenu
     */
    makeSubSubmenu() {
        let subsubmenu = document.createElement("div");
        $(subsubmenu).attr({"class": "ect-subsubmenu"});
        $(subsubmenu).css({
            "display": "none",
            "position": "fixed",
            "min-width": "200px",
            "line-height": "normal",
            "font-family": "Arial",
            "font-size": "14px",
            "cursor": "pointer",
            /*color: white;*/
            "background-color": "#686868",
            "-webkit-box-shadow": "3px 3px 12px -2px rgba(0,0,0,0.75)",
            /*left: 0;*/
            "z-index": "120",
            "overflow-y": "auto"
        });

        let subsubmenu_ul = document.createElement("ul");
        $(subsubmenu_ul).css({
            "list-style-type": "none",
            "padding": "0",
            "margin": "5px 0px"
        });
        $(subsubmenu).append(subsubmenu_ul);

        return subsubmenu;
    }

    /**
     * Creates a separation line for the submenus
     * @returns {Element} The separation line
     */
    makeSeparatorLine() {
        let separator = document.createElement("li");
        $(separator).attr({"class": "ect-separated"});
        $(separator).css({
            "background-color": "" + this.params.buttonHoverColor + "!important",
        });

        let separator_line = document.createElement("span");
        $(separator_line).attr({"class": "ect-separator"});
        $(separator_line).css({
            "display": "block",
            "border-bottom": "1px solid" + this.params.fontColor,
        });

        $(separator).append(separator_line);

        return separator;
    }

    /**
     * Create the subsubmenu buttons recoursively and create susubmenus if needed
     * @param {*} obj - The subsubmenu 
     * @param {Element} add_to - The element which the subsubmenu will be added to
     */
    recoursiveAdditionSub(obj, add_to) {
        for(let i in obj) {

            switch(obj[i].type) {
                case this.buttonTypes.standard: {
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 0, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);

                    break;
                }
                case this.buttonTypes.submenu: {
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 1, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);

                    let new_subsubmenu = this.makeSubSubmenu();
                    $(new_submenu_button).append(new_subsubmenu);

                    this.recoursiveAdditionSub(obj[i].submenu, new_subsubmenu);
                    break;
                }
            }
        }
    }   

    /**
     * Create the submenu buttons recoursively and create susubmenus if needed
     * @param {*} obj - The submenu 
     * @param {Element} add_to - The element which the submenu will be added to
     */
    recoursiveAddition(obj, add_to) {
        for(let i in obj) {
            
            switch(obj[i].type) {
                case this.buttonTypes.standard: {
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 0, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);

                    break;
                }
                case this.buttonTypes.submenu: {
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 1, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);

                    let new_subsubmenu = this.makeSubSubmenu();
                    $(new_submenu_button).append(new_subsubmenu);

                    this.recoursiveAdditionSub(obj[i].submenu, new_subsubmenu);
                    break;
                }
            }
        }
    }

    /**
     * Creates the menu (buttons)
     */
    makeMenu() {
        for(let i in this.menu) {
            let new_button = this.makeMenuButton(i);
            let new_submenu = this.makeSubmenu();
            $(new_button).append(new_submenu);
            $("#ect-titlebar").children(".ect-titlebar_panel").first().append(new_button);
            this.recoursiveAddition(this.menu[i].submenu, new_submenu);
        }

        let dots_b = this.makeHiddenButton();
        let submenu = this.makeSubmenu();
        $(dots_b).append(submenu);
        $("#ect-titlebar").children(".ect-titlebar_panel").first().append(dots_b);
        this.recoursiveAddition(this.menu, submenu);

        $("#ect-b_dots").parent().css({
            "visibility": "hidden",
        });
        $("#ect-b_dots").parent().children(".ect-submenu").first().children("ul").first().children("li").hide();
        console.log($("#ect-b_dots").parent().children(".ect-submenu").first().children("ul").first().children("li"));
    }

    /**
     * Create the hidden dots button
     * @returns {Element} The dots button
     */
    makeHiddenButton() {
        let dots = this.makeMenuButton("...");
        $(dots).children("button").first().attr("id", "ect-b_dots");
        return dots;
    }

    /**
     * Creates the title label. Takes the text from the <title> tag
     */
    makeTitle() {
        let obj = this;
        let title = document.createElement("span");
        $(title).attr({"class": "ect-title_panel"});
        
        $(title).css({
            "font-family": obj.params.titlebarLabelFont,
            "font-size": ("" + obj.params.titlebarLabelSize + "px"),
            "color": obj.params.titlebarLabelColor
        });
        $(title).text($("title").text());
        let zone2 = $("#ect-titlebar").children(".ect-titlebar_panel").get(1);
        $(zone2).append(title);
    }

    /**
     * Creates the buttons for minimize, close and restore/maximize
     */
    makeWindowButtons() {
        let obj = this;
        
        let minimize = document.createElement("button");
        $(minimize).html('<i class="far fa-window-minimize">');
        $(minimize).attr({
            "class": "ect-titlebar_b",
            "id": "ect-minimize_window"
        });
        $(minimize).css({
            "background-color": obj.params.windowButtonColor,
        });
        $(minimize).hover(function() {
            $(this).css({
                "background-color": obj.params.windowButtonHoverColor,
            });            
        });
        $(minimize).mouseleave(function() {
            $(this).css({
                "background-color": obj.params.windowButtonColor,
            });
        });
        $(minimize).click(function() {
            obj.electronWindow.minimize();
        });


        let restore_maximize_window = document.createElement("button");
        $(restore_maximize_window).html('<i class="far fa-window-restore" id="ect-restore_icon"></i><i class="far fa-window-maximize" id="ect-maximize_icon"></i>');
        $(restore_maximize_window).attr({
            "class": "ect-titlebar_b",
            "id": "ect-restore_maximize_window"
        });
        $(restore_maximize_window).css({
            "background-color": obj.params.windowButtonColor,
        });
        $(restore_maximize_window).hover(function() {
            $(this).css({
                "background-color": obj.params.windowButtonHoverColor,
            });            
        });
        $(restore_maximize_window).mouseleave(function() {
            $(this).css({
                "background-color": obj.params.windowButtonColor,
            });
        });
        $(restore_maximize_window).click(function() {
            obj.toggleMaximizeRestoreDown();
        });


        let close = document.createElement("button");
        $(close).html('<i class="fas fa-times">');
        $(close).attr({
            "class": "ect-titlebar_b",
            "id": "ect-close_window"
        });
        $(close).css({
            "background-color": obj.params.windowButtonColor,
        });
        $(close).hover(function() {
            $(this).css({
                "background-color": obj.params.closeButtonHoverColor,
            });            
        });
        $(close).mouseleave(function() {
            $(this).css({
                "background-color": obj.params.backgroundColor,
            });
        });
        $(close).click(function() {
            obj.electronWindow.close();
        })


        let zone3 = $("#ect-titlebar").children(".ect-titlebar_panel").get(2);
        $(zone3).append([minimize, restore_maximize_window, close]);

        $(".ect-titlebar_b").css({
            "display": "inline-block",
            "border": "none",
            "width": "45px",
            "height": "30px",
            "padding-left": "5px",
            "padding-right": "5px",
            "color": "#D3D3D3",
            "font-size": "16px",
            "background-color": "#484848",
            "outline": "none",
            "cursor": "pointer",
            "float": "left"
        });
    }

    /**
     * Calculates the steps for the different buttons
     */
    calculateButtonPositions() {
        let minimum_len_ttl_btn = 235;
        for(let i = 0; i < $(".ect-menu_b").length; i++) {
            let btn = $(".ect-menu_b")[i];
            let btn_width = ($(btn).outerWidth() < $("#ect-b_dots").outerWidth()) ? $("#ect-b_dots").outerWidth() : $(btn).outerWidth(); 
            this.buttonPositions.push(Math.ceil($(btn)[0].getBoundingClientRect().x + btn_width + minimum_len_ttl_btn));
        }
        this.setWindowMinimumSize((this.buttonPositions[1] + $("#ect-b_dots").outerWidth()));
        this.buttonPositions.reverse();
    }

    /**
     * Handles the window resizing 
     */
    resizedWinwow() {
        let current_width = this.getWindowSize()[0];
        let number_buttons = this.buttonPositions.length

        $(".ect-submenu").hide();
        for(let i = 0; i < number_buttons - this.params.minimumNumberMenuButtons; i++) {
            if(current_width < this.buttonPositions[i]) {
                let btn_1 = $(".ect-menu_b").get(number_buttons - i - 1);
                let btn_2 = $(".ect-menu_b").get(number_buttons - i - 2);

                $(btn_1).parent().hide();
                $(btn_2).parent().hide();

                $("#ect-b_dots").parent().css({
                    "visibility": "visible",
                    "display": "inline-block",
                });
                this.calculateSubmenusShown(number_buttons - i - 1, true)
                this.calculateSubmenusShown(number_buttons - i - 2, true)
            }
            else {
                let btn = $(".ect-menu_b").get(number_buttons - i - 2);
                $(btn).parent().show();
                this.calculateSubmenusShown(number_buttons - i - 2, false)
                if(i == 0) {
                    $("#ect-b_dots").parent().css({
                        "visibility": "hidden",
                        "display": "inline-block"
                    });
                }
            }
        }
    }

    /**
     * Shows a submenu if needed 
     * @param {Number} number - The number of the button to show/hide
     * @param {boolean} show - Show if true, else hide
     */
    calculateSubmenusShown(number, show) {
        let submenu = $("#ect-b_dots").parent().children(".ect-submenu").first();
        let li = $(submenu).children("ul").first().children("li").get(number);
    
        if(show == true) {
            $(li).show();
        }
        else {
            $(li).hide();
        }
    }

    /**
     * Loads the correct icon depending on whether
     * the window is maximized or not
     */
    loadCorrectIconWindowButtons() {
        if(this.electronWindow.isMaximized()) {
            $("#ect-maximize_icon").hide();
            $("#ect-restore_icon").show();
        }
        else {
            $("#ect-maximize_icon").show();
            $("#ect-restore_icon").hide(); 
        }
    }

    /**
     * Toggles the window maximization
     */
    toggleMaximizeRestoreDown() {
        if(this.electronWindow.isMaximized()) {
            this.electronWindow.unmaximize();
        }
        else {
            this.electronWindow.maximize();
        }

        this.loadCorrectIconWindowButtons();
    }

    /**
     * Sets the minimum size of the window
     * @param {Number} min_width - The minimum width of the window
     */
    setWindowMinimumSize(min_width) {
        if(this.electronWindow.getMinimumSize()[0] < min_width) {
            let current_mins = this.electronWindow.getMinimumSize();
            console.log("-> " + min_width + " " + current_mins[1]);
            this.electronWindow.setMinimumSize(Math.ceil(min_width), current_mins[1]);
        }
    }

    /**
     * Adds additional event listeners to the titlebar
     */
    addAdditionalEventListeners() {
        let obj = this;

        $(window).resize(function() {
            obj.resizedWinwow();
            obj.loadCorrectIconWindowButtons();
        });

        $(document).ready(function() {
            obj.loadCorrectIconWindowButtons();
            obj.resizedWinwow();
        });

        $(document).click(function() {
            $(".ect-submenu").hide();
        });
    }

    /**
     * Creates the titlebar with custom settings and menu
     * @param {Object} settings - The settings for the titlebar
     * @param {Object} menu - Dictionary containing the menu layout
     * @param {Object} current_window - The current electron window
     */
    create(settings, menu, current_window) {
        this.settings = settings;
        this.menu = menu;
        this.electronWindow = current_window;
        this.createTitlebar();
    }

}

module.exports = new Titlebar();
