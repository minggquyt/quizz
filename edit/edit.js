
const navType = performance.getEntriesByType("navigation")[0].type;

var indexOfCurrentQuizz = 0;
var statusOfQuizz = "draft";
var currentQuizz = null;

if (navType == "navigate") {

    const currentAppData = JSON.parse(localStorage.getItem("appData"));
    const sessionQuizzData = JSON.parse(sessionStorage.getItem("pickQuizz"));

    if (sessionQuizzData != null) {
        statusOfQuizz = sessionQuizzData.quizzStatus;
        indexOfCurrentQuizz = sessionQuizzData.index
        currentQuizz = currentAppData[statusOfQuizz][indexOfCurrentQuizz];
        renderQuizzCard(currentQuizz.sentences);

        console.log(currentAppData);
        console.log(currentAppData.finish[sessionQuizzData.index]);
    }
    else {
        const id = `quizz-${currentAppData.autoIncrement}`;
        currentAppData.autoIncrement++;

        const quizz = {
            "id": `${id}`,
            "name": "No name",
            "sentences": [
                {
                    "id": "question-1",
                    "number": 1,
                    "image": "",
                    "question": "",
                    "correct-answer": "",
                    "wrong-answer": [
                        "",
                        "",
                        ""
                    ]
                }
            ],
            "numberSentences": 1,
            "idIncrement": 2,
        }

        indexOfCurrentQuizz = currentAppData.draft.length;
        currentAppData.draft[indexOfCurrentQuizz] = quizz;

        renderQuizzCard(currentAppData.draft[indexOfCurrentQuizz].sentences);
        currentQuizz = currentAppData[statusOfQuizz][indexOfCurrentQuizz];


        localStorage.setItem("appData", JSON.stringify(currentAppData));
    }

    preventFormDefaultBehavior();

}
else if (navType == "reload") {

    const currentAppData = JSON.parse(localStorage.getItem("appData"));

    const sessionQuizzData = JSON.parse(sessionStorage.getItem("pickQuizz"));
    if (sessionQuizzData != null) {
        statusOfQuizz = sessionQuizzData.quizzStatus;
        indexOfCurrentQuizz = sessionQuizzData.index;
        currentQuizz = currentAppData[statusOfQuizz][indexOfCurrentQuizz];

        renderQuizzCard(currentQuizz.sentences);
    }
    else {
        indexOfCurrentQuizz = currentAppData.draft.length - 1;
        currentQuizz = currentAppData[statusOfQuizz][indexOfCurrentQuizz];

        renderQuizzCard(currentQuizz.sentences);
    }
    console.log("User reload trang !");

    preventFormDefaultBehavior();

}
else {
    console.log("User back_forward !");

    const currentAppData = JSON.parse(localStorage.getItem("appData"));
    renderQuizzCard(currentAppData.draft[currentAppData.draft.length - 1].sentences);
    indexOfCurrentQuizz = currentAppData.draft.length - 1;
    currentQuizz = currentAppData[statusOfQuizz][indexOfCurrentQuizz];

    preventFormDefaultBehavior();

}

function renderQuizzCard(data) {
    const renderDiv = document.querySelector(".content__body--cards");
    data.forEach((quizz, index) => {
        console.log(quizz.question);
        renderDiv.innerHTML += (
            `<div data-index=${quizz.number} class="content__body--card content__body--card-${index + 1}">
                    <div class="content__body--card__header">
                        <h3 class="content__body--card__header__number be-vietnam-pro-regular">
                            ${index + 1}
                        </h3>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                    <div class="content__body--card__body">
                        <div class="content__body--card__body__correct">
                            <div class="content__body--card__body__correct--question">
                                <p class="be-vietnam-pro-regular" >Câu hỏi</p>
                                <form action="">
                                    <input class="be-vietnam-pro-regular" type="text" placeholder="Hãy nhập câu hỏi" data-value="question" value="${quizz.question}" >
                                </form>
                            </div>
                            <div class="content__body--card__body__correct--answer">
                                <p class="be-vietnam-pro-regular" >Câu trả lời</p>
                                <form action="">
                                    <input class="be-vietnam-pro-regular" type="text" placeholder="Hãy nhập câu trả lời" data-value="correctanswer" value="${quizz['correct-answer']}" >
                                </form>
                            </div>
                            <div class="content__body--card__body__correct--image">
                                <span class="material-symbols-outlined">
                                    image
                                </span>
                                Hình ảnh
                            </div>
                        </div>
                        <div class="content__body--card__body__preview_and_wrong">
                            <div class="content__body--card__body__preview">
                                <h1 class="be-vietnam-pro-extrabold" >Xem trước</h1>
                            </div>
                            <div class="content__body--card__body__wrong">
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular" >Lựa chọn đáp án</p>
                                    <input class="be-vietnam-pro-regular" type="text" placeholder="Nhập lựa chọn trắc nghiệm 1" data-value="wronganswer1" value="${quizz["wrong-answer"][0]}" >
                                </form>
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular">Lựa chọn đáp án</p>
                                    <input class="be-vietnam-pro-regular" type="text" placeholder="Nhập lựa chọn trắc nghiệm 2" data-value="wronganswer2" value="${quizz["wrong-answer"][1]}" >
                                </form>
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular">Lựa chọn đáp án</p>
                                    <input class="be-vietnam-pro-regular" type="text" placeholder="Nhập lựa chọn trắc nghiệm 3" data-value="wronganswer3" value="${quizz["wrong-answer"][2]}" >
                                </form>
                                <p class="content__body--card__body__wrong--delete">
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                    Xóa các lựa chọn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
        )
    })
}

const addQuizzCardButton = document.querySelector(".content__body--addcard");

addQuizzCardButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const renderDiv = document.querySelector(".content__body--cards");

    let currentAppData = JSON.parse(localStorage.getItem("appData"));

    const sentenceIndex = currentQuizz.sentences.length;
    const sentenceId = currentQuizz.idIncrement++;

    const quizzCard = {
        "id": `question-${sentenceId}`,
        "number": sentenceId,
        "image": "",
        "question": "",
        "correct-answer": "",
        "wrong-answer": [
            "",
            "",
            ""
        ]
    }

    currentQuizz.sentences[sentenceIndex] = quizzCard;

    // Thêm vào DOM
    const orderOfCurrentCard = document.querySelectorAll(".content__body--card").length + 1;
    const divContainer = document.createElement("div");
    divContainer.classList.add(`content__body--card`);
    divContainer.classList.add(`content__body--card-${orderOfCurrentCard}`);
    divContainer.dataset.index = sentenceId;

    divContainer.innerHTML = (
        `<div data-index=${quizzCard.number} class="content__body--card__header">
                        <h3 class="content__body--card__header__number be-vietnam-pro-regular">
                            ${orderOfCurrentCard}
                        </h3>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                    <div class="content__body--card__body">
                        <div class="content__body--card__body__correct">
                            <div class="content__body--card__body__correct--question">
                                <p class="be-vietnam-pro-regular" >Câu hỏi</p>
                                <form action="">
                                    <input data-value="question" type="text" class="be-vietnam-pro-regular" placeholder="Hãy nhập câu hỏi">
                                </form>
                            </div>
                            <div class="content__body--card__body__correct--answer">
                                <p class="be-vietnam-pro-regular" >Câu trả lời</p>
                                <form action="">
                                    <input class="be-vietnam-pro-regular" data-value="correctanswer" type="text" placeholder="Hãy nhập câu trả lời">
                                </form>
                            </div>
                            <div class="content__body--card__body__correct--image">
                                <span class="material-symbols-outlined">
                                    image
                                </span>
                                Hình ảnh
                            </div>
                        </div>
                        <div class="content__body--card__body__preview_and_wrong">
                            <div class="content__body--card__body__preview">
                                <h1 class="be-vietnam-pro-extrabold">Xem trước</h1>
                            </div>
                            <div class="content__body--card__body__wrong">
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular">Lựa chọn đáp án</p>
                                    <input data-value="wronganswer1" class="be-vietnam-pro-regular" type="text" placeholder="Nhập lựa chọn trắc nghiệm 1">
                                </form>
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular">Lựa chọn đáp án</p>
                                    <input class="be-vietnam-pro-regular" data-value="wronganswer2" type="text" placeholder="Nhập lựa chọn trắc nghiệm 2">
                                </form>
                                <form action="" class="content__body--card__body__wrong-answer">
                                    <p class="be-vietnam-pro-regular">Lựa chọn đáp án</p>
                                    <input class="be-vietnam-pro-regular" data-value="wronganswer3" type="text" placeholder="Nhập lựa chọn trắc nghiệm 3">
                                </form>
                                <p class="content__body--card__body__wrong--delete">
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                    Xóa các lựa chọn
                                </p>
                            </div>
                        </div>
                    </div>`
    )
    renderDiv.append(divContainer);

    currentQuizz.numberSentences++;

    currentAppData[statusOfQuizz][indexOfCurrentQuizz] = currentQuizz;

    console.log(currentAppData);   

    localStorage.setItem("appData", JSON.stringify(currentAppData));

    preventFormDefaultBehavior();
})

const createQuizzButton = document.querySelector(".content__header--create_button");
createQuizzButton.addEventListener("click", () => {

    const currentAppData = JSON.parse(localStorage.getItem("appData"));

    const currentQuestions = currentAppData.draft[indexOfCurrentQuizz].sentences.length;

    const createStatus = {
        status: false
    }

    if (currentQuestions < 5) {
        const event = new CustomEvent("notEnoughQuestion");
        document.dispatchEvent(event);

    }
    else {

        // Logic lấy tên quizz 
        const quizzName = getQuizzName();

        if (quizzName == '')
            currentAppData.draft[indexOfCurrentQuizz].name = 'No name';
        else
            currentAppData.draft[indexOfCurrentQuizz].name = quizzName;


        const finishedQuizz = currentAppData.draft[indexOfCurrentQuizz];

        var indexOfFinishQuizz = currentAppData.finish.length;
        currentAppData.finish[indexOfFinishQuizz] = finishedQuizz;

        currentAppData.draft.pop();

        // logic lấy giá trị từ các ô input vào quizz
        getValueInFormToQuizz(currentAppData.finish[indexOfFinishQuizz], 'finish')

        console.log(currentAppData.finish[indexOfCurrentQuizz]);

        localStorage.setItem("appData", JSON.stringify(currentAppData));

        createStatus.status = true;

        window.location.href = "/";

    }

})

// code lại logic lấy data input -> lưu lên LS -> là oke 
const container = document.querySelector('.content__body--cards');
container.addEventListener('change', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const input = e.target.closest('.content__body--card');
    console.log(input.dataset.index)

    currentQuizz.sentences.forEach((quizz) => {
        if(quizz.number == input.dataset.index){
            console.log("Câu hỏi hiện tại mà người dùng đã nhập: ");
            console.log(quizz);

            // logic lấy giá trị và update lên LS 
            const inputValue = e.target.value;
            const type = e.target.dataset.value;

            console.log(inputValue);
            console.log(type);

            // logic update lên localStorage 
            if(type == 'question')
                quizz.question = inputValue;
            else if(type == 'correctanswer')
                quizz['correct-answer'] = inputValue;
            else{
                if(type == 'wronganswer1')
                    quizz['wrong-answer'][0] = inputValue;
                else if(type == 'wronganswer2')
                    quizz['wrong-answer'][1] = inputValue;
                else
                    quizz['wrong-answer'][2] = inputValue;
            }

            const currentAppData = JSON.parse(localStorage.getItem('appData'));
            currentAppData[statusOfQuizz][indexOfCurrentQuizz] = currentQuizz;
            localStorage.setItem("appData",JSON.stringify(currentAppData));
        }
    })
 
})

function getValueInFormToQuizz(quizz, status) {
    console.log(quizz);
    console.log(status);

    const quizzName = getQuizzName();
    if (quizzName == '')
        quizz.name = 'No name';
    else
        quizz.name = quizzName;

}

const createDraftQuizzButton = document.querySelector(".content__header--create_draft_button");
createDraftQuizzButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("bạn đã click vào button tạo bản nháp !");

    const currentAppData = JSON.parse(localStorage.getItem("appData"));

    const quizzName = getQuizzName();

    if (quizzName == '')
        currentAppData.draft[indexOfCurrentQuizz].name = 'No Name';
    else
        currentAppData.draft[indexOfCurrentQuizz].name = quizzName;

    localStorage.setItem("appData", JSON.stringify(currentAppData));

    window.location.href = '/';
})

function getQuizzName() {
    const quizzName = document.querySelector(".content__header--quiz_title > input");
    return quizzName.value;
}

function preventFormDefaultBehavior() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
        })
    })
}

document.addEventListener("notEnoughQuestion", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const body = document.querySelector("body");
    const pseudo = document.querySelector(".edit--pseudo");
    const alertBox = document.querySelector(".edit--alert");

    body.classList.add("edit--alert--active");
    pseudo.classList.add("edit--pseudo--active");
    alertBox.classList.add("edit--alert--active");

    const agreebutton = document.querySelector(".edit--alert > button");
    agreebutton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        body.classList.remove("edit--alert--active");
        pseudo.classList.remove("edit--pseudo--active");
        alertBox.classList.remove("edit--alert--active");
    })
    pseudo.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        body.classList.remove("edit--alert--active");
        pseudo.classList.remove("edit--pseudo--active");
        alertBox.classList.remove("edit--alert--active");
    })
})

