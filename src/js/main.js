// main.js

let jseditor = null;

// https://github.com/json-editor/json-editor
JSONEditor.defaults.theme = "spectre";
JSONEditor.defaults.iconlib = "spectre";

const editorControl = document.getElementById("editor-control");
const editorHolder = document.getElementById("editor-holder");
const schemaTextarea = document.getElementById("schema-textarea");
const btnShowSchemaModal = document.getElementById("show-schema-modal");
const btnCloseSchemaModal = document.getElementById("close-schema-modal");
const btnUpdateSchema = document.getElementById("update-schema");

let options = {
  schema: schema,
};

const initJsonEditor = () => {
  schemaTextarea.value = JSON.stringify(options.schema, null, 2);

  if (jseditor) {
    jseditor.destroy();
  }

  jseditor = new JSONEditor(editorHolder, options);
};

const setupPage = () => {
  initJsonEditor();

  // https://github.com/json-editor/json-editor/wiki/Adding-a-SaveAsFile-button
  jseditor.on("ready", function () {
    var button = jseditor.root.getButton(
      "Save Result As File",
      "save",
      "Save Result As File",
    );
    // button_holder = jseditor.root.theme.getButtonHolder();
    // button_holder.appendChild(button);
    // jseditor.root.header.parentNode.insertBefore(button_holder, jseditor.root.header.nextSibling);
    editorControl.appendChild(button);
    button.addEventListener("click", function (e) {
      e.preventDefault();
      var example = jseditor.getValue(),
        filename = "data.json",
        blob = new Blob([JSON.stringify(example, null, 2)], {
          type: "application/json;charset=utf-8",
        });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement("a");
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");

        a.dispatchEvent(
          new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": true,
          }),
        );
      }
    }, false);
  });
};

// Button Event

const updateSchema = () => {
  try {
    options.schema = JSON.parse(schemaTextarea.value);
  } catch (e) {
    alert("Invalid Schema: " + e.message);
    return;
  }
  closeSchemaModal();
  initJsonEditor();
};

const showSchemaModal = () => {
  modal = document.getElementById("schema-modal");
  modal.classList.add("active");
};

const closeSchemaModal = () => {
  modal = document.getElementById("schema-modal");
  modal.classList.remove("active");
};


// Event Listener

btnUpdateSchema.addEventListener("click", function () {
  updateSchema();
});

btnShowSchemaModal.addEventListener("click", function () {
  showSchemaModal();
});

btnCloseSchemaModal.addEventListener("click", function () {
  closeSchemaModal();
});

setupPage();
