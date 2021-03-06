class EventType {
  public static INTERACT: symbol = Symbol('interact');
  public static TOUCH: symbol = Symbol('touch');
  public static CURSOR_DOWN: symbol = Symbol('cursor down');
  public static CURSOR_MOVE: symbol = Symbol('cursor move');
  public static CURSOR_UP: symbol = Symbol('cursor up');
  public static ABORT : symbol = Symbol('abort');
  public static AFTERPRINT : symbol = Symbol('afterprint');
  public static ANIMATIONEND : symbol = Symbol('animationend');
  public static ANIMATIONITERATION : symbol = Symbol('animationiteration');
  public static ANIMATIONSTART : symbol = Symbol('animationstart');
  public static APPINSTALLED : symbol = Symbol('appinstalled');
  public static AUDIOPROCESS : symbol = Symbol('audioprocess');
  public static AUDIOEND : symbol = Symbol('audioend');
  public static AUDIOSTART : symbol = Symbol('audiostart');
  public static BEFOREPRINT : symbol = Symbol('beforeprint');
  public static BEFOREUNLOAD : symbol = Symbol('beforeunload');
  public static BEGIN_EVENT : symbol = Symbol('beginEvent');
  public static BLOCKED : symbol = Symbol('blocked');
  public static BLUR : symbol = Symbol('blur');
  public static BOUNDARY : symbol = Symbol('boundary');
  public static CACHED : symbol = Symbol('cached');
  public static CANPLAY : symbol = Symbol('canplay');
  public static CANPLAYTHROUGH : symbol = Symbol('canplaythrough');
  public static CHANGE : symbol = Symbol('change');
  public static CHARGINGCHANGE : symbol = Symbol('chargingchange');
  public static CHARGINGTIMECHANGE : symbol = Symbol('chargingtimechange');
  public static CHECKING : symbol = Symbol('checking');
  public static CLICK : symbol = Symbol('click');
  public static CLOSE : symbol = Symbol('close');
  public static COMPLETE : symbol = Symbol('complete');
  public static THE : symbol = Symbol('The');
  public static COMPOSITIONEND : symbol = Symbol('compositionend');
  public static COMPOSITIONSTART : symbol = Symbol('compositionstart');
  public static COMPOSITIONUPDATE : symbol = Symbol('compositionupdate');
  public static CONTEXTMENU : symbol = Symbol('contextmenu');
  public static COPY : symbol = Symbol('copy');
  public static CUT : symbol = Symbol('cut');
  public static DBLCLICK : symbol = Symbol('dblclick');
  public static DEVICECHANGE : symbol = Symbol('devicechange');
  public static DEVICELIGHT : symbol = Symbol('devicelight');
  public static DEVICEMOTION : symbol = Symbol('devicemotion');
  public static DEVICEORIENTATION : symbol = Symbol('deviceorientation');
  public static DEVICEPROXIMITY : symbol = Symbol('deviceproximity');
  public static DISCHARGINGTIMECHANGE : symbol = Symbol('dischargingtimechange');
  public static DOMACTIVATE : symbol = Symbol('DOMActivate');
  public static DOMATTRIBUTE_NAME_CHANGED : symbol = Symbol('DOMAttributeNameChanged');
  public static DOMATTR_MODIFIED : symbol = Symbol('DOMAttrModified');
  public static DOMCHARACTER_DATA_MODIFIED : symbol = Symbol('DOMCharacterDataModified');
  public static DOMCONTENT_LOADED : symbol = Symbol('DOMContentLoaded');
  public static DOMELEMENT_NAME_CHANGED : symbol = Symbol('DOMElementNameChanged');
  public static DOMFOCUS_IN : symbol = Symbol('DOMFocusIn');
  public static DOMFOCUS_OUT : symbol = Symbol('DOMFocusOut');
  public static DOMNODE_INSERTED : symbol = Symbol('DOMNodeInserted');
  public static DOMNODE_INSERTED_INTO_DOCUMENT : symbol = Symbol('DOMNodeInsertedIntoDocument');
  public static DOMNODE_REMOVED : symbol = Symbol('DOMNodeRemoved');
  public static DOMNODE_REMOVED_FROM_DOCUMENT : symbol = Symbol('DOMNodeRemovedFromDocument');
  public static DOMSUBTREE_MODIFIED : symbol = Symbol('DOMSubtreeModified');
  public static DOWNLOADING : symbol = Symbol('downloading');
  public static DRAG : symbol = Symbol('drag');
  public static DRAGEND : symbol = Symbol('dragend');
  public static DRAGENTER : symbol = Symbol('dragenter');
  public static DRAGLEAVE : symbol = Symbol('dragleave');
  public static DRAGOVER : symbol = Symbol('dragover');
  public static DRAGSTART : symbol = Symbol('dragstart');
  public static DROP : symbol = Symbol('drop');
  public static DURATIONCHANGE : symbol = Symbol('durationchange');
  public static EMPTIED : symbol = Symbol('emptied');
  public static END : symbol = Symbol('end');
  public static ENDED : symbol = Symbol('ended');
  public static END_EVENT : symbol = Symbol('endEvent');
  public static ERROR : symbol = Symbol('error');
  public static FOCUS : symbol = Symbol('focus');
  public static FOCUSIN : symbol = Symbol('focusin');
  public static FOCUSOUT : symbol = Symbol('focusout');
  public static FULLSCREENCHANGE : symbol = Symbol('fullscreenchange');
  public static FULLSCREENERROR : symbol = Symbol('fullscreenerror');
  public static GAMEPADCONNECTED : symbol = Symbol('gamepadconnected');
  public static GAMEPADDISCONNECTED : symbol = Symbol('gamepaddisconnected');
  public static GOTPOINTERCAPTURE : symbol = Symbol('gotpointercapture');
  public static HASHCHANGE : symbol = Symbol('hashchange');
  public static LOSTPOINTERCAPTURE : symbol = Symbol('lostpointercapture');
  public static INPUT : symbol = Symbol('input');
  public static INVALID : symbol = Symbol('invalid');
  public static KEYDOWN : symbol = Symbol('keydown');
  public static KEYPRESS : symbol = Symbol('keypress');
  public static KEYUP : symbol = Symbol('keyup');
  public static LANGUAGECHANGE : symbol = Symbol('languagechange');
  public static LEVELCHANGE : symbol = Symbol('levelchange');
  public static LOAD : symbol = Symbol('load');
  public static LOADEDDATA : symbol = Symbol('loadeddata');
  public static LOADEDMETADATA : symbol = Symbol('loadedmetadata');
  public static LOADEND : symbol = Symbol('loadend');
  public static LOADSTART : symbol = Symbol('loadstart');
  public static MARK : symbol = Symbol('mark');
  public static MESSAGE : symbol = Symbol('message');
  public static MESSAGEERROR : symbol = Symbol('messageerror');
  public static MOUSEDOWN : symbol = Symbol('mousedown');
  public static MOUSEENTER : symbol = Symbol('mouseenter');
  public static MOUSELEAVE : symbol = Symbol('mouseleave');
  public static MOUSEMOVE : symbol = Symbol('mousemove');
  public static MOUSEOUT : symbol = Symbol('mouseout');
  public static MOUSEOVER : symbol = Symbol('mouseover');
  public static MOUSEUP : symbol = Symbol('mouseup');
  public static NOMATCH : symbol = Symbol('nomatch');
  public static NOTIFICATIONCLICK : symbol = Symbol('notificationclick');
  public static NOUPDATE : symbol = Symbol('noupdate');
  public static OBSOLETE : symbol = Symbol('obsolete');
  public static OFFLINE : symbol = Symbol('offline');
  public static ONLINE : symbol = Symbol('online');
  public static OPEN : symbol = Symbol('open');
  public static ORIENTATIONCHANGE : symbol = Symbol('orientationchange');
  public static PAGEHIDE : symbol = Symbol('pagehide');
  public static PAGESHOW : symbol = Symbol('pageshow');
  public static PASTE : symbol = Symbol('paste');
  public static PAUSE : symbol = Symbol('pause');
  public static POINTERCANCEL : symbol = Symbol('pointercancel');
  public static POINTERDOWN : symbol = Symbol('pointerdown');
  public static POINTERENTER : symbol = Symbol('pointerenter');
  public static POINTERLEAVE : symbol = Symbol('pointerleave');
  public static POINTERLOCKCHANGE : symbol = Symbol('pointerlockchange');
  public static POINTERLOCKERROR : symbol = Symbol('pointerlockerror');
  public static POINTERMOVE : symbol = Symbol('pointermove');
  public static POINTEROUT : symbol = Symbol('pointerout');
  public static POINTEROVER : symbol = Symbol('pointerover');
  public static POINTERUP : symbol = Symbol('pointerup');
  public static PLAY : symbol = Symbol('play');
  public static PLAYING : symbol = Symbol('playing');
  public static POPSTATE : symbol = Symbol('popstate');
  public static PROGRESS : symbol = Symbol('progress');
  public static PUSH : symbol = Symbol('push');
  public static PUSHSUBSCRIPTIONCHANGE : symbol = Symbol('pushsubscriptionchange');
  public static RATECHANGE : symbol = Symbol('ratechange');
  public static READYSTATECHANGE : symbol = Symbol('readystatechange');
  public static REPEAT_EVENT : symbol = Symbol('repeatEvent');
  public static RESET : symbol = Symbol('reset');
  public static RESIZE : symbol = Symbol('resize');
  public static RESOURCETIMINGBUFFERFULL : symbol = Symbol('resourcetimingbufferfull');
  public static RESULT : symbol = Symbol('result');
  public static RESUME : symbol = Symbol('resume');
  public static SCROLL : symbol = Symbol('scroll');
  public static SEEKED : symbol = Symbol('seeked');
  public static SEEKING : symbol = Symbol('seeking');
  public static SELECT : symbol = Symbol('select');
  public static SELECTSTART : symbol = Symbol('selectstart');
  public static SELECTIONCHANGE : symbol = Symbol('selectionchange');
  public static SHOW : symbol = Symbol('show');
  public static SOUNDEND : symbol = Symbol('soundend');
  public static SOUNDSTART : symbol = Symbol('soundstart');
  public static SPEECHEND : symbol = Symbol('speechend');
  public static SPEECHSTART : symbol = Symbol('speechstart');
  public static STALLED : symbol = Symbol('stalled');
  public static START : symbol = Symbol('start');
  public static STORAGE : symbol = Symbol('storage');
  public static SUBMIT : symbol = Symbol('submit');
  public static SUCCESS : symbol = Symbol('success');
  public static SUSPEND : symbol = Symbol('suspend');
  public static SVGABORT : symbol = Symbol('SVGAbort');
  public static SVGERROR : symbol = Symbol('SVGError');
  public static SVGLOAD : symbol = Symbol('SVGLoad');
  public static SVGRESIZE : symbol = Symbol('SVGResize');
  public static SVGSCROLL : symbol = Symbol('SVGScroll');
  public static SVGUNLOAD : symbol = Symbol('SVGUnload');
  public static SVGZOOM : symbol = Symbol('SVGZoom');
  public static TIMEOUT : symbol = Symbol('timeout');
  public static TIMEUPDATE : symbol = Symbol('timeupdate');
  public static TOUCHCANCEL : symbol = Symbol('touchcancel');
  public static TOUCHEND : symbol = Symbol('touchend');
  public static TOUCHMOVE : symbol = Symbol('touchmove');
  public static TOUCHSTART : symbol = Symbol('touchstart');
  public static TRANSITIONEND : symbol = Symbol('transitionend');
  public static UNLOAD : symbol = Symbol('unload');
  public static UPDATEREADY : symbol = Symbol('updateready');
  public static UPGRADENEEDED : symbol = Symbol('upgradeneeded');
  public static USERPROXIMITY : symbol = Symbol('userproximity');
  public static VOICESCHANGED : symbol = Symbol('voiceschanged');
  public static VERSIONCHANGE : symbol = Symbol('versionchange');
  public static VISIBILITYCHANGE : symbol = Symbol('visibilitychange');
  public static VOLUMECHANGE : symbol = Symbol('volumechange');
  public static WAITING : symbol = Symbol('waiting');
  public static WHEEL : symbol = Symbol('wheel');
  public static AFTERSCRIPTEXECUTE : symbol = Symbol('afterscriptexecute');
  public static BEFORESCRIPTEXECUTE : symbol = Symbol('beforescriptexecute');
  public static BEFOREINSTALLPROMPT : symbol = Symbol('beforeinstallprompt');
  public static CARDSTATECHANGE : symbol = Symbol('cardstatechange');
  public static CONNECTION_INFO_UPDATE : symbol = Symbol('connectionInfoUpdate');
  public static CFSTATECHANGE : symbol = Symbol('cfstatechange');
  public static DATACHANGE : symbol = Symbol('datachange');
  public static DATAERROR : symbol = Symbol('dataerror');
  public static DOMMOUSE_SCROLL : symbol = Symbol('DOMMouseScroll');
  public static DRAGDROP : symbol = Symbol('dragdrop');
  public static DRAGEXIT : symbol = Symbol('dragexit');
  public static DRAGGESTURE : symbol = Symbol('draggesture');
  public static ICCCARDLOCKERROR : symbol = Symbol('icccardlockerror');
  public static ICCINFOCHANGE : symbol = Symbol('iccinfochange');
  public static LOCALIZED : symbol = Symbol('localized');
  public static MOUSEWHEEL : symbol = Symbol('mousewheel');
  public static MOZ_AUDIO_AVAILABLE : symbol = Symbol('MozAudioAvailable');
  public static MOZ_BEFORE_RESIZE : symbol = Symbol('MozBeforeResize');
  public static MOZBROWSERACTIVITYDONE : symbol = Symbol('mozbrowseractivitydone');
  public static MOZBROWSERASYNCSCROLL : symbol = Symbol('mozbrowserasyncscroll');
  public static MOZBROWSERAUDIOPLAYBACKCHANGE : symbol = Symbol('mozbrowseraudioplaybackchange');
  public static MOZBROWSERCARETSTATECHANGED : symbol = Symbol('mozbrowsercaretstatechanged');
  public static MOZBROWSERCLOSE : symbol = Symbol('mozbrowserclose');
  public static MOZBROWSERCONTEXTMENU : symbol = Symbol('mozbrowsercontextmenu');
  public static MOZBROWSERDOCUMENTFIRSTPAINT : symbol = Symbol('mozbrowserdocumentfirstpaint');
  public static MOZBROWSERERROR : symbol = Symbol('mozbrowsererror');
  public static MOZBROWSERFINDCHANGE : symbol = Symbol('mozbrowserfindchange');
  public static MOZBROWSERFIRSTPAINT : symbol = Symbol('mozbrowserfirstpaint');
  public static MOZBROWSERICONCHANGE : symbol = Symbol('mozbrowsericonchange');
  public static MOZBROWSERLOCATIONCHANGE : symbol = Symbol('mozbrowserlocationchange');
  public static MOZBROWSERLOADEND : symbol = Symbol('mozbrowserloadend');
  public static MOZBROWSERLOADSTART : symbol = Symbol('mozbrowserloadstart');
  public static MOZBROWSERMANIFESTCHANGE : symbol = Symbol('mozbrowsermanifestchange');
  public static MOZBROWSERMETACHANGE : symbol = Symbol('mozbrowsermetachange');
  public static MOZBROWSEROPENSEARCH : symbol = Symbol('mozbrowseropensearch');
  public static MOZBROWSEROPENTAB : symbol = Symbol('mozbrowseropentab');
  public static MOZBROWSEROPENWINDOW : symbol = Symbol('mozbrowseropenwindow');
  public static MOZBROWSERRESIZE : symbol = Symbol('mozbrowserresize');
  public static MOZBROWSERSCROLL : symbol = Symbol('mozbrowserscroll');
  public static MOZBROWSERSCROLLAREACHANGED : symbol = Symbol('mozbrowserscrollareachanged');
  public static MOZBROWSERSCROLLVIEWCHANGE : symbol = Symbol('mozbrowserscrollviewchange');
  public static MOZBROWSERSECURITYCHANGE : symbol = Symbol('mozbrowsersecuritychange');
  public static MOZBROWSERSELECTIONSTATECHANGED : symbol = Symbol('mozbrowserselectionstatechanged');
  public static MOZBROWSERSHOWMODALPROMPT : symbol = Symbol('mozbrowsershowmodalprompt');
  public static MOZBROWSERTITLECHANGE : symbol = Symbol('mozbrowsertitlechange');
  public static MOZBROWSERUSERNAMEANDPASSWORDREQUIRED : symbol = Symbol('mozbrowserusernameandpasswordrequired');
  public static MOZBROWSERVISIBILITYCHANGE : symbol = Symbol('mozbrowservisibilitychange');
  public static MOZ_GAMEPAD_BUTTON_DOWN : symbol = Symbol('MozGamepadButtonDown');
  public static MOZ_GAMEPAD_BUTTON_UP : symbol = Symbol('MozGamepadButtonUp');
  public static MOZ_MOUSE_PIXEL_SCROLL : symbol = Symbol('MozMousePixelScroll');
  public static MOZ_ORIENTATION : symbol = Symbol('MozOrientation');
  public static MOZ_SCROLLED_AREA_CHANGED : symbol = Symbol('MozScrolledAreaChanged');
  public static MOZTIMECHANGE : symbol = Symbol('moztimechange');
  public static MOZ_TOUCH_DOWN : symbol = Symbol('MozTouchDown');
  public static MOZ_TOUCH_MOVE : symbol = Symbol('MozTouchMove');
  public static MOZ_TOUCH_UP : symbol = Symbol('MozTouchUp');
  public static ALERTING : symbol = Symbol('alerting');
  public static BUSY : symbol = Symbol('busy');
  public static CALLSCHANGED : symbol = Symbol('callschanged');
  public static ONCONNECTED : symbol = Symbol('onconnected');
  public static CONNECTING : symbol = Symbol('connecting');
  public static DELIVERED : symbol = Symbol('delivered');
  public static DIALING : symbol = Symbol('dialing');
  public static DISABLED : symbol = Symbol('disabled');
  public static DISCONNECTED : symbol = Symbol('disconnected');
  public static DISCONNECTING : symbol = Symbol('disconnecting');
  public static ENABLED : symbol = Symbol('enabled');
  public static HELD : symbol = Symbol('held');
  public static HOLDING : symbol = Symbol('holding');
  public static INCOMING : symbol = Symbol('incoming');
  public static RECEIVED : symbol = Symbol('received');
  public static RESUMING : symbol = Symbol('resuming');
  public static SENT : symbol = Symbol('sent');
  public static STATECHANGE : symbol = Symbol('statechange');
  public static STATUSCHANGE : symbol = Symbol('statuschange');
  public static OVERFLOW : symbol = Symbol('overflow');
  public static SMARTCARD : symbol = Symbol('smartcard');
  public static STKCOMMAND : symbol = Symbol('stkcommand');
  public static STKSESSIONEND : symbol = Symbol('stksessionend');
  public static TEXT : symbol = Symbol('text');
  public static TOUCHENTER : symbol = Symbol('touchenter');
  public static TOUCHLEAVE : symbol = Symbol('touchleave');
  public static UNDERFLOW : symbol = Symbol('underflow');
  public static UPLOADPROGRESS : symbol = Symbol('uploadprogress');
  public static USSDRECEIVED : symbol = Symbol('ussdreceived');
  public static VOICECHANGE : symbol = Symbol('voicechange');
  public static BROADCAST : symbol = Symbol('broadcast');
  public static CHECKBOX_STATE_CHANGE : symbol = Symbol('CheckboxStateChange');
  public static COMMAND : symbol = Symbol('command');
  public static COMMANDUPDATE : symbol = Symbol('commandupdate');
  public static DOMMENU_ITEM_ACTIVE : symbol = Symbol('DOMMenuItemActive');
  public static DOMMENU_ITEM_INACTIVE : symbol = Symbol('DOMMenuItemInactive');
  public static POPUPHIDDEN : symbol = Symbol('popuphidden');
  public static POPUPHIDING : symbol = Symbol('popuphiding');
  public static POPUPSHOWING : symbol = Symbol('popupshowing');
  public static POPUPSHOWN : symbol = Symbol('popupshown');
  public static RADIO_STATE_CHANGE : symbol = Symbol('RadioStateChange');
  public static VALUE_CHANGE : symbol = Symbol('ValueChange');
  public static ADD : symbol = Symbol('Add');
  public static MOZ_SWIPE_GESTURE : symbol = Symbol('MozSwipeGesture');
  public static MOZ_MAGNIFY_GESTURE_START : symbol = Symbol('MozMagnifyGestureStart');
  public static MOZ_MAGNIFY_GESTURE_UPDATE : symbol = Symbol('MozMagnifyGestureUpdate');
  public static MOZ_MAGNIFY_GESTURE : symbol = Symbol('MozMagnifyGesture');
  public static MOZ_ROTATE_GESTURE_START : symbol = Symbol('MozRotateGestureStart');
  public static MOZ_ROTATE_GESTURE_UPDATE : symbol = Symbol('MozRotateGestureUpdate');
  public static MOZ_ROTATE_GESTURE : symbol = Symbol('MozRotateGesture');
  public static MOZ_TAP_GESTURE : symbol = Symbol('MozTapGesture');
  public static MOZ_PRESS_TAP_GESTURE : symbol = Symbol('MozPressTapGesture');
  public static MOZ_EDGE_UIGESTURE : symbol = Symbol('MozEdgeUIGesture');
  public static MOZ_AFTER_PAINT : symbol = Symbol('MozAfterPaint');
  public static DOMPOPUP_BLOCKED : symbol = Symbol('DOMPopupBlocked');
  public static DOMWINDOW_CREATED : symbol = Symbol('DOMWindowCreated');
  public static DOMWINDOW_CLOSE : symbol = Symbol('DOMWindowClose');
  public static DOMTITLE_CHANGED : symbol = Symbol('DOMTitleChanged');
  public static DOMLINK_ADDED : symbol = Symbol('DOMLinkAdded');
  public static DOMLINK_REMOVED : symbol = Symbol('DOMLinkRemoved');
  public static DOMMETA_ADDED : symbol = Symbol('DOMMetaAdded');
  public static DOMMETA_REMOVED : symbol = Symbol('DOMMetaRemoved');
  public static DOMWILL_OPEN_MODAL_DIALOG : symbol = Symbol('DOMWillOpenModalDialog');
  public static DOMMODAL_DIALOG_CLOSED : symbol = Symbol('DOMModalDialogClosed');
  public static DOMAUTO_COMPLETE : symbol = Symbol('DOMAutoComplete');
  public static DOMFRAME_CONTENT_LOADED : symbol = Symbol('DOMFrameContentLoaded');
  public static ALERT_ACTIVE : symbol = Symbol('AlertActive');
  public static ALERT_CLOSE : symbol = Symbol('AlertClose');
  public static FULLSCREEN : symbol = Symbol('fullscreen');
  public static SIZEMODECHANGE : symbol = Symbol('sizemodechange');
  public static MOZ_ENTERED_DOM_FULLSCREEN : symbol = Symbol('MozEnteredDomFullscreen');
  public static SSWINDOW_CLOSING : symbol = Symbol('SSWindowClosing');
  public static SSTAB_CLOSING : symbol = Symbol('SSTabClosing');
  public static SSTAB_RESTORING : symbol = Symbol('SSTabRestoring');
  public static SSTAB_RESTORED : symbol = Symbol('SSTabRestored');
  public static SSWINDOW_STATE_READY : symbol = Symbol('SSWindowStateReady');
  public static SSWINDOW_STATE_BUSY : symbol = Symbol('SSWindowStateBusy');
  public static TAB_OPEN : symbol = Symbol('TabOpen');
  public static TAB_CLOSE : symbol = Symbol('TabClose');
  public static TAB_SELECT : symbol = Symbol('TabSelect');
  public static TAB_SHOW : symbol = Symbol('TabShow');
  public static TAB_HIDE : symbol = Symbol('TabHide');
  public static TAB_PINNED : symbol = Symbol('TabPinned');
  public static TAB_UNPINNED : symbol = Symbol('TabUnpinned');
  public static CSS_RULE_VIEW_REFRESHED : symbol = Symbol('CssRuleViewRefreshed');
  public static CSS_RULE_VIEW_CHANGED : symbol = Symbol('CssRuleViewChanged');
  public static CSS_RULE_VIEW_CSSLINK_CLICKED : symbol = Symbol('CssRuleViewCSSLinkClicked');
}

export {EventType};
