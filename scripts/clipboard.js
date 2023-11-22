
let copyButtons = document.querySelectorAll('.copy-button')

function copyBtnClickHandler(ev) {
  navigator.clipboard.writeText(ev.currentTarget.dataset.text)
}

copyButtons.forEach(btn => {
  btn.addEventListener('click', copyBtnClickHandler)
})
