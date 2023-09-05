let existing_apidata = localStorage.getItem("responsedata");
if (existing_apidata == null) {
  let req = new XMLHttpRequest();
  req.onload = function () {
    localStorage.setItem("responsedata", this.responseText);
    let fetched_apidata = localStorage.getItem("responsedata");
    displaying_elements(fetched_apidata);
  };
  req.open("GET", "https://jsonplaceholder.typicode.com/todos/", true);
  req.send();
} else {
  displaying_elements(existing_apidata);
}
function displaying_elements(data) {
  let arr = JSON.parse(data);

  let cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  cardContainer.id = "cardContainer";
  document.body.appendChild(cardContainer);

  for (let obj of arr) {
    cardContainer.appendChild(createcard(obj));
  }

  function createcard(obj) {
    let card = document.createElement("div");
    card.className = "card";
    for (let key in obj) {
      if (key == "title") {
        let titlediv = document.createElement("div");
        titlediv.className = "titlediv";
        card.appendChild(titlediv);
        let title = document.createElement("h3");
        title.className = "";
        title.textContent = key + ":" + obj[key];
        titlediv.appendChild(title);
        // let buttons = document.createElement("div");
        // buttons.className = "buttons";
        // element.appendChild(buttons);
        let del = document.createElement("button");
        del.className = "del";
        del.textContent = "Delete";
        titlediv.appendChild(del);
        let edit = document.createElement("button");
        edit.className = "edit";
        edit.textContent = "Edit";
        titlediv.appendChild(edit);
        edit.addEventListener("click", function () {
          title.contentEditable = true;
          title.focus();
          title.addEventListener("blur", function () {
            obj[key] = this.textContent;
            localStorage.setItem("responsedata", JSON.stringify(arr));
            title.contentEditable = false;
          });
        });
        del.addEventListener("click", function (e) {
          cardContainer.removeChild(card);
          const index = arr.indexOf(obj);
          arr.splice(index, 1);
          localStorage.setItem("responsedata", JSON.stringify(arr));
        });
      } else {
        if (key != "completed") {
          let element = document.createElement("h3");
          element.textContent = key + ":" + obj[key];
          card.appendChild(element);
        }
      }
    }
    return card;
  }
}
