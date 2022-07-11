const arr = [1, 2, 3, 4, 5];

function teste123() {
    const a = document.getElementsByClassName("form-check");
  
    const arr = Array.from(a);
  
    console.log(arr);
  
    const arr1 = [];
  
    arr.forEach((el) => {
      if (el.children[0].checked) {
        arr1.push(el.children[1].textContent.trim());
      }
    });
  
    console.log("Selecionados: ", arr1);
  }
