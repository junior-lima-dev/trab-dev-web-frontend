window.addEventListener("load", function (event) {
  const fontSize = window.localStorage.getItem("fontSize");
  const backgroundColor = window.localStorage.getItem("backgroundColor");

  console.log("local storage: ", fontSize, backgroundColor);

  const collectionFontSize = document.getElementsByClassName(
    "accessible-font-size"
  );
  const collectionBackgroundColor = document.getElementsByClassName(
    "accessible-background-color"
  );

  for (i = 0; i < collectionFontSize.length; i++) {
    collectionFontSize[i].style.fontSize = fontSize;
  }

  for (i = 0; i < collectionBackgroundColor.length; i++) {
    collectionBackgroundColor[i].style.backgroundColor = backgroundColor;
  }
});

function changeFontSize() {
  const collection = document.getElementsByClassName("accessible-font-size");

  console.log("res: ", collection[0].style.fontSize);

  let fontSize = "";

  for (i = 0; i < collection.length; i++) {
    fontSize = collection[i].style.fontSize === "20px" ? "16px" : "20px";

    collection[i].style.fontSize = fontSize;
  }

  window.localStorage.setItem("fontSize", fontSize);
}

function changeBackGroundColor() {
  const collection = document.getElementsByClassName(
    "accessible-background-color"
  );

  console.log("res: ", collection[0].style.backgroundColor);

  let backgroundColor = "";

  for (i = 0; i < collection.length; i++) {
    backgroundColor =
      collection[i].style.backgroundColor === "black" ? "white" : "black";

    collection[i].style.backgroundColor = backgroundColor;
  }

  window.localStorage.setItem("backgroundColor", backgroundColor);
}
