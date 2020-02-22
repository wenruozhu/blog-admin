<template>
  <div id="app">
    <froala id="edit" :tag="'textarea'" :config="config" v-model="content"></froala>
  </div>
</template>
<script>
import VueFroala from "vue-froala-wysiwyg";

export default {
  name: "app",
  data() {
    return {
      content: "Edit Your Content Here!",
      config: {
        events: {
          initialized: function() {
            console.log("initialized");
          }
        },
        quickInsertEnabled: false,
        height: 500,
        imageStyles: {
          class1: "Class 1",
          class2: "Class 2"
        },
        imageEditButtons: [
          "imageReplace",
          "imageAlign",
          "imageCaption",
          "imageRemove",
          "|",
          "imageLink",
          "linkOpen",
          "linkEdit",
          "linkRemove",
          "-",
          "imageDisplay",
          "imageStyle",
          "imageAlt",
          "imageSize"
        ],
        /* dragInline: true,
          pluginsEnabled: ["image", "link", "draggable"], */
        toolbarButtons: {
          // Key represents the more button from the toolbar.

          moreText: {
            // List of buttons used in the  group.
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting"
            ],

            // Alignment of the group in the toolbar.
            align: "left",

            // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
            buttonsVisible: 3
          },

          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote"
            ],
            align: "left",
            buttonsVisible: 3
          },

          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertTable",
              "emoticons",
              "fontAwesome",
              "specialCharacters",
              "embedly",
              "insertFile",
              "insertHR"
            ],
            align: "left",
            buttonsVisible: 3
          },

          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              "getPDF",
              "spellChecker",
              "selectAll",
              "html",
              "help"
            ],
            align: "right",
            buttonsVisible: 2
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
</style>
