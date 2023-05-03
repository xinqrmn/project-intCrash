

const slidesPlugin = (activeSlide = 2) => {
	const slides = document.querySelectorAll('.slide')
	slides[activeSlide].classList.add('active')
	const clearActiveClasses = () => {
		slides.forEach(slide => {
			slide.classList.remove('active')
		})
	}

	slides.forEach(slide => {
		slide.addEventListener('click', () => {
			clearActiveClasses()

			slide.classList.add('active')
		})
	})
}

slidesPlugin()




const createModal = () => {

	const modalOverlay = document.createElement('div')
	modalOverlay.className = 'modal-overlay modal-overlay_hidden'

	const deleteModal = document.createElement('div')
	deleteModal.className = 'delete-modal'

	const form = document.createElement('form')
	form.className = 'form'

	deleteModal.append(form)
	modalOverlay.append(deleteModal)

	const formTitle = document.createElement('h3')
	formTitle.className = 'form__title title-3'
	formTitle.textContent = 'Отправить заявку'

	const requiredSymbol = document.createElement('span')
	requiredSymbol.textContent = '*'

	const inputControl1   = document.createElement('div')
	const inputControl2   = document.createElement('div')
	const inputControl3   = document.createElement('div')

	const labelUsername = document.createElement('label')
	const labelPhone = document.createElement('label')
	const labelEmail = document.createElement('label')

	const inputUsername = document.createElement('input')
	const inputPhone = document.createElement('input')
	const inputEmail = document.createElement('input')

	labelUsername.setAttribute('for', 'username')
	labelUsername.innerHTML = 'Имя <span>*</span>'

	labelPhone.setAttribute('for', 'phone')
	labelPhone.innerHTML = 'Телефон <span>*</span>'

	labelEmail.setAttribute('for', 'email')
	labelEmail.innerHTML = 'E-mail <span>*</span>'

	inputUsername.id = 'username'
	inputUsername.name = 'username'
	inputUsername.type = 'text'
	// inputUsername.required = true

	inputPhone.id = 'phone'
	inputPhone.name = 'phone'
	inputPhone.type = 'text'
	// inputPhone.required = true

	inputEmail.id = 'email'
	inputEmail.name = 'email'
	inputEmail.type = 'email'
	// inputEmail.required = true

	inputControl1.className = 'input-control'
	inputControl1.append(labelUsername, inputUsername)
	inputControl2.className = 'input-control'
	inputControl2.append(labelPhone, inputPhone)
	inputControl3.className = 'input-control'
	inputControl3.append(labelEmail, inputEmail)

	const submitButton = document.createElement('button')
	submitButton.type = 'submit'
	submitButton.textContent = 'Отправить'

	form.append(formTitle, inputControl1, inputControl2, inputControl3, submitButton)

	return {
		modalOverlay,
		form,
		inputUsername,
		inputPhone,
		inputEmail,
		submitButton
	}
}

const createRequest = document.querySelector('.header__link')
const {modalOverlay, form,	inputUsername,	inputEmail, inputPhone,	submitButton} = createModal()
document.body.prepend(modalOverlay)


const setError = element => {
	const inputControl = element.parentElement

	inputControl.classList.add('error')
	inputControl.classList.remove('success')
}

const setSuccess = element => {
	const inputControl = element.parentElement

	inputControl.classList.add('success')
	inputControl.classList.remove('error')
}

const isValidEmail = email => {
	const re = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/
	return re.test(String(email).toLowerCase())
}
const validateInputs = () => {
	const inputUsernameValue = inputUsername.value.trim()
	const inputEmailValue = inputEmail.value.trim()
	const inputPhoneValue = inputPhone.value.trim()

	if (inputUsernameValue === '') setError(inputUsername)
	else setSuccess(inputUsername)

	if (inputPhoneValue === '') setError(inputPhone)
	else setSuccess(inputPhone)

	if (inputEmailValue === '') setError(inputEmail)
	else if (!isValidEmail(inputEmailValue)) setError(inputEmail)
	else setSuccess(inputEmail)
}


createRequest.addEventListener('click', () => {
	modalOverlay.classList.remove('modal-overlay_hidden')
	$("#phone").mask('+7(999) 999-99-99');
})

window.addEventListener('click', e => {
	const { target } = e
	if (target === modalOverlay) {
		modalOverlay.classList.add('modal-overlay_hidden')
	}
})


form.addEventListener('submit', e => {
	e.preventDefault()
	validateInputs()
})

$('.header__menu').click(function (event) {
	$('.nav,.menu__btn').toggleClass('active')
})