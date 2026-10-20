document.addEventListener('DOMContentLoaded', () => {
  const digitsOnly = (str) => str.replace(/\D/g, '');

  function formatPhone(digits) {
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);

    const p = digits.slice(1);
    let result = '+7';
    if (p.length > 0) result += ' ' + p.slice(0, 3);
    if (p.length > 3) result += ' ' + p.slice(3, 6);
    if (p.length > 6) result += ' ' + p.slice(6, 8);
    if (p.length > 8) result += ' ' + p.slice(8, 10);
    return result;
  }

  function getCaretAfterFormat(input, prevValue, newValue) {
    const prevCaret = input.selectionStart;
    const digitsBefore = digitsOnly(prevValue.slice(0, prevCaret)).length;
    let count = 0;
    for (let i = 0; i < newValue.length; i++) {
      if (/\d/.test(newValue[i])) count++;
      if (count === digitsBefore) return i + 1;
    }
    return newValue.length;
  }

  function bindPhoneMask(input) {
    input.addEventListener('focus', () => {
      if (!input.value) input.value = '+7 ';
    });

    input.addEventListener('blur', () => {
      if (digitsOnly(input.value).length <= 1) input.value = '';
    });

    input.addEventListener('input', () => {
      const prevValue = input.value;
      const digits = digitsOnly(prevValue);

      if (digits.length === 0) {
        input.value = '';
        return;
      }

      const formatted = formatPhone(digits);
      input.value = formatted;

      const newCaret = getCaretAfterFormat(input, prevValue, formatted);
      input.setSelectionRange(newCaret, newCaret);
    });

    input.addEventListener('keydown', (e) => {
      const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (allowed.includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const digits = digitsOnly(pasted);
      if (digits) input.value = formatPhone(digits);
    });
  }

  function isFieldValid(input) {
    const value = input.value.trim();
    if (input.hasAttribute('data-phone')) return digitsOnly(value).length === 11;
    if (input.hasAttribute('data-email')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return value.length > 0;
  }

  function setFieldError(input, hasError) {
    const wrapper = input.closest('[data-field-wrapper]');
    if (wrapper) wrapper.classList.toggle('field-wrapper--error', hasError);
  }

  function setCheckboxError(label, hasError) {
    if (label) label.classList.toggle('form-checkbox-label--error', hasError);
  }

  function setAdditLabelError(label, hasError) {
    if (label) label.classList.toggle('form-addit-info__label--error', hasError);
  }

  function initForm(form) {
    const fields = form.querySelectorAll('[data-field][data-required]');
    const checkbox = form.querySelector('[data-checkbox]');
    const checkboxLabel = form.querySelector('[data-checkbox-label]');
    // const additLabel = form.querySelector('[data-addit-label]');
    const additBtns = form.querySelectorAll('[data-addit-btn]');

    fields.forEach((input) => {
      if (input.hasAttribute('data-phone')) bindPhoneMask(input);

      input.addEventListener('blur', () => {
        if (form.dataset.submitAttempted === 'true' || input.value.trim() !== '') {
          setFieldError(input, !isFieldValid(input));
        }
      });

      input.addEventListener('input', () => {
        const wrapper = input.closest('[data-field-wrapper]');
        if (wrapper && wrapper.classList.contains('field-wrapper--error')) {
          setFieldError(input, !isFieldValid(input));
        }
      });
    });

    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) setCheckboxError(checkboxLabel, false);
      });
    }

    additBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        additBtns.forEach((b) => b.classList.remove('btn-form-addit--active'));
        btn.classList.add('btn-form-addit--active');
        // setAdditLabelError(additLabel, false);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.dataset.submitAttempted = 'true';
      let hasErrors = false;

      fields.forEach((input) => {
        const valid = isFieldValid(input);
        setFieldError(input, !valid);
        if (!valid) hasErrors = true;
      });

      const checkboxValid = checkbox ? checkbox.checked : true;
      setCheckboxError(checkboxLabel, !checkboxValid);
      if (!checkboxValid) hasErrors = true;

      const additValid = !!form.querySelector('.btn-form-addit--active');
      // setAdditLabelError(additLabel, !additValid);
      if (!additValid) hasErrors = true;

      if (hasErrors) {
        const firstError =
          form.querySelector('[data-field-wrapper].field-wrapper--error input') ||
          form.querySelector('[data-checkbox-label].form-checkbox-label--error')
          // form.querySelector('[data-addit-label].form-addit-info__label--error');

        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (firstError.matches('input')) firstError.focus({ preventScroll: true });
        }
        return;
      }

      const formData = Object.fromEntries(new FormData(form).entries());
      console.log('Форма валидна:', formData);
    });
  }

  document.querySelectorAll('[data-form]').forEach(initForm);
});