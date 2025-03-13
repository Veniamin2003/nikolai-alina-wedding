export const Registration = () => {
    const childrenRadioYes = document.querySelector(".js-question__children"); // Радио "да"
    const childrenRadioNo = document.querySelector("input[name='q3'][value='нет']"); // Радио "нет"
    const inputContainer = document.querySelector(".js-question__input"); // Контейнер инпута
    const inputField = inputContainer.querySelector("input"); // Само поле ввода

    if (childrenRadioYes && childrenRadioNo && inputContainer && inputField) {
        function toggleInput() {
            if (childrenRadioYes.checked) {
                // inputContainer.style.display = "block";
                inputContainer.classList.add('isActive');
            } else {
                // inputContainer.style.display = "none";
                inputContainer.classList.remove('isActive');
                inputField.value = ""; // Очищаем поле ввода
            }
        }

        // Навешиваем обработчики на оба варианта
        childrenRadioYes.addEventListener("change", toggleInput);
        childrenRadioNo.addEventListener("change", toggleInput);

        // Скрываем поле и очищаем ввод при загрузке, если "да" не выбрано
        toggleInput();
    }

    document.querySelector(".js-form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Останавливаем стандартную отправку формы

        const nameInput = document.querySelector(".js-input__name input");
        const nameInputWrapper = document.querySelector(".js-input__name .js-input");
        const nameError = document.querySelector(".js-input__name .js-input__error");

        const questionInput = document.querySelector(".js-question__input input");
        const questionInputWrapper = document.querySelector(".js-question__input .js-input");
        const questionError = document.querySelector(".js-question__input .js-input__error");

        // Очистка прошлых ошибок
        nameInputWrapper.classList.remove("isError");
        nameError.textContent = "Текст ошибки";

        questionInputWrapper.classList.remove("isError");
        questionError.textContent = "Текст ошибки";

        if (!nameInput.value.trim()) {
            nameError.textContent = "Пожалуйста, введите ваше имя";
            nameInputWrapper.classList.add("isError");
            return; // Прерываем отправку формы
        }

        if (!questionInput.value.trim() && childrenRadioYes.checked) {
            questionError.textContent = "Пожалуйста, введите кол-во детей";
            questionInputWrapper.classList.add("isError");
            return; // Прерываем отправку формы
        }

        const botToken = "7503385274:AAH8Ce4D_J8G3fdJW27rz7gePNN6mWom6ww"; // Замените на токен бота
        // const chatId = "714501194"; // Замените на ваш chat_id
        const chatId = "-4644326224"; // id чата группы

        // Получаем значения инпутов
        const name = nameInput.value;
        const childrenCount = questionInput.value;

        let childrenCountText = "";
        if (childrenCount) {
            childrenCountText = `Кол-во детей: ${childrenCount}`;
        }

        const answers = [];

        document.querySelectorAll(".js-question").forEach((question, index) => {
            const checkedInput = question.querySelector("input:checked");
            const questionText = question.querySelector(".js-question__text").innerText;
            const answer = checkedInput ? checkedInput.value : "Не выбрано";
            answers.push(`${index + 1}. ${questionText}: ${answer}`);
        });

        const message = `📩 Новая анкета гостя:\n\n👤 Имя: ${name}\n\n${answers.join("\n")} \n${childrenCountText}`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // alert("Анкета отправлена!");
                umGlobal.togglePopup("success")
                document.querySelector(".o-registration").reset(); // Сброс формы
            } else {
                console.error("Ошибка при отправке!")
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    });
};

export const InputHide = () => {
    try {
        const childrenRadioYes = document.querySelector(".js-question__children"); // Радио "да"
        const childrenRadioNo = document.querySelector("input[name='q3'][value='нет']"); // Радио "нет"
        const inputContainer = document.querySelector(".js-question__input"); // Контейнер инпута
        const inputField = inputContainer.querySelector("input"); // Само поле ввода

        if (childrenRadioYes && childrenRadioNo && inputContainer && inputField) {
            function toggleInput() {
                if (childrenRadioYes.checked) {
                    // inputContainer.style.display = "block";
                    inputContainer.classList.add('isActive');
                } else {
                    // inputContainer.style.display = "none";
                    inputContainer.classList.remove('isActive');
                    inputField.value = ""; // Очищаем поле ввода
                }
            }

            // Навешиваем обработчики на оба варианта
            childrenRadioYes.addEventListener("change", toggleInput);
            childrenRadioNo.addEventListener("change", toggleInput);

            // Скрываем поле и очищаем ввод при загрузке, если "да" не выбрано
            toggleInput();
        }
    } catch (e) {
        console.error(e);
    }
}

export const InputMasks = () => {
    try {
        const nameInput = document.querySelector(".js-input__name input");
        const questionInput = document.querySelector(".js-question__input input");

        // Ограничение на ввод только букв и пробелов (запрет чисел и символов)
        nameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ""); // Добавлен пробел (\s) в разрешённые символы
        });

        // Ограничение на ввод только чисел (запрет букв и символов)
        questionInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, ""); // Удаляет все нечисловые символы
        });
    } catch (e) {
        console.error(e);
    }
}
