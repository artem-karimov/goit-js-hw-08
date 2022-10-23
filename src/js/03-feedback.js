import throttle from 'lodash.throttle';

const initializeForm = () => {
  const form = document.querySelector('.feedback-form');

  const formStateKey = 'feedback-form-state';

  const getFormState = () => localStorage.getItem(formStateKey);

  const storedFormState = getFormState();

  if (storedFormState) {
    const formState = JSON.parse(storedFormState);
    for (const formElement of form.elements) {
      for (const key in formState) {
        if (formElement.name === key) formElement.value = formState[key];
      }
    }
  }

  const handleInput = ({ target }) => {
    const { name, value } = target;

    const storedFormState = getFormState();

    if (storedFormState) {
      const formState = JSON.parse(storedFormState);
      const newFormState = {
        ...formState,
        [name]: value,
      };
      localStorage.setItem(formStateKey, JSON.stringify(newFormState));
    } else {
      const newFormState = {
        [name]: value,
      };
      localStorage.setItem(formStateKey, JSON.stringify(newFormState));
    }
  };

  const handleInputThrottled = throttle(handleInput, 500);

  const handleSubmit = event => {
    event.preventDefault();

    const storedFormState = getFormState();

    const alertMessage = 'All form fields should be filled!';

    if (storedFormState) {
      const formState = JSON.parse(storedFormState);
      for (const formElement of form.elements) {
        const elementName = formElement.getAttribute('name');
        if (elementName && !formState[elementName]) {
          alert(alertMessage);
          return;
        }
      }
      console.log(formState);
      form.reset();
      localStorage.clear();
    } else alert(alertMessage);
  };

  form.addEventListener('input', handleInputThrottled);

  form.addEventListener('submit', handleSubmit);
};

initializeForm();
