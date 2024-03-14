import {
  DomHandler
} from "./chunk-EK2YCWCT.js";
import {
  SharedModule,
  UniqueComponentId
} from "./chunk-RZQT7UY4.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgIf,
  NgStyle
} from "./chunk-6SW73RU6.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Inject,
  Input,
  InputFlags,
  NgModule,
  Renderer2,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3DM3ISHR.js";
import "./chunk-WKYGNSYM.js";

// node_modules/primeng/fesm2022/primeng-badge.mjs
function Badge_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 1);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.styleClass);
    ɵɵproperty("ngClass", ctx_r0.containerClass())("ngStyle", ctx_r0.style);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.value);
  }
}
var BadgeDirective = class _BadgeDirective {
  document;
  el;
  renderer;
  /**
   * Icon position of the component.
   * @group Props
   */
  iconPos = "left";
  /**
   * When specified, disables the component.
   * @group Props
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
  }
  /**
   * Size of the badge, valid options are "large" and "xlarge".
   * @group Props
   */
  get size() {
    return this._size;
  }
  set size(val) {
    this._size = val;
    if (this.initialized) {
      this.setSizeClasses();
    }
  }
  /**
   * Value to display inside the badge.
   * @group Props
   */
  get value() {
    return this._value;
  }
  set value(val) {
    if (val !== this._value) {
      this._value = val;
      if (this.initialized) {
        let badge = document.getElementById(this.id);
        if (this._value) {
          if (DomHandler.hasClass(badge, "p-badge-dot"))
            DomHandler.removeClass(badge, "p-badge-dot");
          if (String(this._value).length === 1) {
            DomHandler.addClass(badge, "p-badge-no-gutter");
          } else {
            DomHandler.removeClass(badge, "p-badge-no-gutter");
          }
        } else if (!this._value && !DomHandler.hasClass(badge, "p-badge-dot")) {
          DomHandler.addClass(badge, "p-badge-dot");
        }
        badge.innerHTML = "";
        this.renderer.appendChild(badge, document.createTextNode(this._value));
      }
    }
  }
  /**
   * Severity type of the badge.
   * @group Props
   */
  severity;
  _value;
  initialized = false;
  id;
  _disabled = false;
  _size;
  constructor(document2, el, renderer) {
    this.document = document2;
    this.el = el;
    this.renderer = renderer;
  }
  ngAfterViewInit() {
    this.id = UniqueComponentId() + "_badge";
    let el = this.el.nativeElement.nodeName.indexOf("-") != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
    if (this._disabled) {
      return null;
    }
    let badge = this.document.createElement("span");
    badge.id = this.id;
    badge.className = "p-badge p-component";
    if (this.severity) {
      DomHandler.addClass(badge, "p-badge-" + this.severity);
    }
    this.setSizeClasses(badge);
    if (this.value != null) {
      this.renderer.appendChild(badge, this.document.createTextNode(this.value));
      if (String(this.value).length === 1) {
        DomHandler.addClass(badge, "p-badge-no-gutter");
      }
    } else {
      DomHandler.addClass(badge, "p-badge-dot");
    }
    DomHandler.addClass(el, "p-overlay-badge");
    this.renderer.appendChild(el, badge);
    this.initialized = true;
  }
  setSizeClasses(element) {
    const badge = element ?? this.document.getElementById(this.id);
    if (!badge) {
      return;
    }
    if (this._size) {
      if (this._size === "large") {
        DomHandler.addClass(badge, "p-badge-lg");
        DomHandler.removeClass(badge, "p-badge-xl");
      }
      if (this._size === "xlarge") {
        DomHandler.addClass(badge, "p-badge-xl");
        DomHandler.removeClass(badge, "p-badge-lg");
      }
    } else {
      DomHandler.removeClass(badge, "p-badge-lg");
      DomHandler.removeClass(badge, "p-badge-xl");
    }
  }
  ngOnDestroy() {
    this.initialized = false;
  }
  static ɵfac = function BadgeDirective_Factory(t) {
    return new (t || _BadgeDirective)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _BadgeDirective,
    selectors: [["", "pBadge", ""]],
    hostAttrs: [1, "p-element"],
    inputs: {
      iconPos: "iconPos",
      disabled: [InputFlags.None, "badgeDisabled", "disabled"],
      size: "size",
      value: "value",
      severity: "severity"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeDirective, [{
    type: Directive,
    args: [{
      selector: "[pBadge]",
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    iconPos: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: ["badgeDisabled"]
    }],
    size: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    severity: [{
      type: Input
    }]
  });
})();
var Badge = class _Badge {
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Size of the badge, valid options are "large" and "xlarge".
   * @group Props
   */
  size;
  /**
   * Severity type of the badge.
   * @group Props
   */
  severity;
  /**
   * Value to display inside the badge.
   * @group Props
   */
  value;
  /**
   * When specified, disables the component.
   * @group Props
   */
  badgeDisabled = false;
  containerClass() {
    return {
      "p-badge p-component": true,
      "p-badge-no-gutter": this.value != void 0 && String(this.value).length === 1,
      "p-badge-lg": this.size === "large",
      "p-badge-xl": this.size === "xlarge",
      "p-badge-info": this.severity === "info",
      "p-badge-success": this.severity === "success",
      "p-badge-warning": this.severity === "warning",
      "p-badge-danger": this.severity === "danger"
    };
  }
  static ɵfac = function Badge_Factory(t) {
    return new (t || _Badge)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Badge,
    selectors: [["p-badge"]],
    hostAttrs: [1, "p-element"],
    inputs: {
      styleClass: "styleClass",
      style: "style",
      size: "size",
      severity: "severity",
      value: "value",
      badgeDisabled: "badgeDisabled"
    },
    decls: 1,
    vars: 1,
    consts: [[3, "ngClass", "class", "ngStyle", 4, "ngIf"], [3, "ngClass", "ngStyle"]],
    template: function Badge_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Badge_span_0_Template, 2, 5, "span", 0);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.badgeDisabled);
      }
    },
    dependencies: [NgClass, NgIf, NgStyle],
    styles: ["@layer primeng{.p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
    type: Component,
    args: [{
      selector: "p-badge",
      template: ` <span *ngIf="!badgeDisabled" [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">{{ value }}</span> `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      },
      styles: ["@layer primeng{.p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}}\n"]
    }]
  }], null, {
    styleClass: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    severity: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    badgeDisabled: [{
      type: Input
    }]
  });
})();
var BadgeModule = class _BadgeModule {
  static ɵfac = function BadgeModule_Factory(t) {
    return new (t || _BadgeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _BadgeModule,
    declarations: [Badge, BadgeDirective],
    imports: [CommonModule],
    exports: [Badge, BadgeDirective, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [Badge, BadgeDirective, SharedModule],
      declarations: [Badge, BadgeDirective]
    }]
  }], null, null);
})();
export {
  Badge,
  BadgeDirective,
  BadgeModule
};
//# sourceMappingURL=primeng_badge.js.map
