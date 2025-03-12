interface PrintFunction {
  extendOptions: Function;
  getStyle: Function;
  setDomHeight: Function;
  toPrint: Function;
}

const Print = function (dom, options?: object): PrintFunction {
  options = options || {};
  // @ts-expect-error
  if (!(this instanceof Print)) return new Print(dom, options);
  // @ts-expect-error
  this.conf = {
    styleStr: "",
    setDomHeightArr: [],
    printBeforeFn: null,
    printDoneCallBack: null
  };
  // @ts-expect-error
  for (const key in this.conf) {
    if (key && options.hasOwnProperty(key)) {
      // @ts-expect-error
      this.conf[key] = options[key];
    }
  }
  if (typeof dom === "string") {
    // @ts-expect-error
    this.dom = document.querySelector(dom);
  } else {
    // @ts-expect-error
    this.dom = this.isDOM(dom) ? dom : dom.$el;
  }
  // @ts-expect-error
  if (this.conf.setDomHeightArr && this.conf.setDomHeightArr.length) {
    // @ts-expect-error
    this.setDomHeight(this.conf.setDomHeightArr);
  }
  // @ts-expect-error
  this.init();
};

Print.prototype = {
  init: function (): void {
    const content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  },

  extendOptions: function <T>(obj, obj2: T): T {
    for (const k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  },

  getStyle: function (): string {
    let str = "";
    const styles: NodeListOf<Element> = document.querySelectorAll("style,link");
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str += `<style>.no-print{display:none;}${this.conf.styleStr}</style>`;
    return str;
  },

  getHtml: function (): Element {
    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");
    const textareas = document.querySelectorAll("textarea");
    const canvass = document.querySelectorAll("canvas");

    for (let k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute("checked", "checked");
        } else {
          inputs[k].removeAttribute("checked");
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute("value", inputs[k].value);
      } else {
        inputs[k].setAttribute("value", inputs[k].value);
      }
    }

    for (let k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == "textarea") {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    for (let k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type == "select-one") {
        const child = selects[k3].children;
        for (const i in child) {
          if (child[i].tagName == "OPTION") {
            if ((child[i] as any).selected == true) {
              child[i].setAttribute("selected", "selected");
            } else {
              child[i].removeAttribute("selected");
            }
          }
        }
      }
    }

    for (let k4 = 0; k4 < canvass.length; k4++) {
      const imageURL = canvass[k4].toDataURL("image/png");
      const img = document.createElement("img");
      img.src = imageURL;
      img.setAttribute("style", "max-width: 100%;");
      img.className = "isNeedRemove";
      canvass[k4].parentNode.insertBefore(img, canvass[k4].nextElementSibling);
    }

    return this.dom.outerHTML;
  },

  writeIframe: function (content) {
    let w: Document | Window;
    let doc: Document;
    const iframe: HTMLIFrameElement = document.createElement("iframe");
    const f: HTMLIFrameElement = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    iframe.setAttribute(
      "style",
      "position:absolute;width:0;height:0;top:-10px;left:-10px;"
    );

    w = f.contentWindow || f.contentDocument;

    doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();

    const removes = document.querySelectorAll(".isNeedRemove");
    for (let k = 0; k < removes.length; k++) {
      removes[k].parentNode.removeChild(removes[k]);
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    iframe.onload = function (): void {
      if (_this.conf.printBeforeFn) {
        _this.conf.printBeforeFn({ doc });
      }
      _this.toPrint(w);
      setTimeout(function () {
        document.body.removeChild(iframe);
        if (_this.conf.printDoneCallBack) {
          _this.conf.printDoneCallBack();
        }
      }, 100);
    };
  },

  toPrint: function (frameWindow): void {
    try {
      setTimeout(function () {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand("print", false, null)) {
            frameWindow.print();
          }
        } catch {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.error(err);
    }
  },
  isDOM:
    typeof HTMLElement === "object"
      ? function (obj) {
          return obj instanceof HTMLElement;
        }
      : function (obj) {
          return (
            obj &&
            typeof obj === "object" &&
            obj.nodeType === 1 &&
            typeof obj.nodeName === "string"
          );
        },

  setDomHeight(arr) {
    if (arr && arr.length) {
      arr.forEach(name => {
        const domArr = document.querySelectorAll(name);
        domArr.forEach(dom => {
          dom.style.height = dom.offsetHeight + "px";
        });
      });
    }
  }
};

export default Print;
