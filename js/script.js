// create array to store opened windows
let windows = [];

const list = document.getElementById("list");
let listItems = list.getElementsByTagName("li");

// add event listener to initial list item button 
listItems[0].lastElementChild.addEventListener("click", 
  function submitButton_click() {
    // if button has value "Open" then open window
    if (this.value == "Open") {
      // text input attached to button
      const txtBox = this.previousElementSibling;

      if (txtBox.value == "") {
          // add a class that defines an animation
          txtBox.classList.add('emptyField');
          // remove the class after the animation completes
          setTimeout(function() {
              txtBox.classList.remove('emptyField');
          }, 300);
        return;
      }
      // create new list item to add
      const newListItem = list.appendChild(this.parentElement.cloneNode(true));
      newListItem.firstElementChild.value = "";
      newListItem.lastElementChild.addEventListener("click", submitButton_click);
      // change current list item state
      this.value = "Close";
      txtBox.disabled = true;
      // open window using current item and push window to windows array
      windows.push(window.open(this.previousElementSibling.value));
    
    // if button has value "Close" then close window
    } else if (this.value == "Close") {

      // close and remove window attached to current item
      const i = getChildIndex(this.parentElement);
      windows[i].close();
      windows.splice(i, 1);
      this.parentElement.remove();
      
    }
  });

// returns index of child in its parent 
function getChildIndex(child) {
  let i = 0;
  while ((child = child.previousElementSibling) != null) ++i;

  return i;
}
