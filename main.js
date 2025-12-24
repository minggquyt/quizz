document.addEventListener("DOMContentLoaded", () => {

    const isSuccess = localStorage.getItem("appData");

    // Khởi tạo appData - LocalStorage 
    if (!isSuccess) {
        console.log("chưa tồn tại giá trị trong LocalStorage");
        const initData = {
            "finish": [
            ],
            "draft": [
            ],
            "autoIncrement": 0
        }
        localStorage.setItem("appData", JSON.stringify(initData));
    }

    renderQuizz();

    // Khởi tạo sesstionStorage 
    sessionStorage.setItem("pickQuizz", JSON.stringify(null));
})


function renderQuizz() {

    const renderFinishQuizzDiv = document.querySelector(".content__body--quizzes");
    const renderDraftQuizzDiv = document.querySelector(".content__body--quizzes_draft");
    const finishedQuizz = JSON.parse(localStorage.getItem("appData")).finish;
    const draftQuizz = JSON.parse(localStorage.getItem("appData")).draft;

    renderFinishQuizzDiv.innerHTML = "";
    renderDraftQuizzDiv.innerHTML = "";

    if (finishedQuizz.length == 0) {
        const text = document.createElement("p");
        text.innerText = "chưa có dữ liệu";
        text.classList.add("content__body--quizzes_text");
        text.classList.add("be-vietnam-pro-light");
        renderFinishQuizzDiv.appendChild(text);
    }
    else if (finishedQuizz.length > 0) {
        finishedQuizz.forEach(quizz => {
            renderFinishQuizzDiv.innerHTML += (
                `<div id=${quizz.id} class="content__body--quizz">
                    <p>Số lượng câu: ${quizz.numberSentences}<span class="content__body--quizz-delete material-symbols-outlined">delete</span></p>
                    <h1 class="be-vietnam-pro-extrabold" >${quizz.name}<button class="be-vietnam-pro-light" >Chỉnh sửa</button></h1>
                </div>`
            )
        });
    }

    if (draftQuizz.length == 0) {
        const text = document.createElement("p");
        text.innerText = "chưa có dữ liệu";
        text.classList.add("content__body--quizzes_draft_text");
        text.classList.add("be-vietnam-pro-light");
        renderDraftQuizzDiv.appendChild(text);
    }
    else if (draftQuizz.length > 0) {
        draftQuizz.forEach(quizz => {
            renderDraftQuizzDiv.innerHTML += (
                `<div id=${quizz.id} class="content__body--quizz">
                    <p class="be-vietnam-pro-light">Số lượng câu: ${quizz.numberSentences}<span class="content__body--quizz-delete material-symbols-outlined">delete</span></p>
                    <h1 class="be-vietnam-pro-extrabold" >${quizz.name}<button class="be-vietnam-pro-light" >Chỉnh sửa</button></h1>
                </div>`
            )
        });
    }

    deleteQuizz();

    updateQuizz();

}

function findIndexAndStatusOfQuizz(currentQuizzId, appData) {
    const Quizz = {
        "findStatus": false,
        "quizzStatus": null,
        "index": null
    }
    appData.draft.forEach((quizz, index) => {
        if (quizz.id == currentQuizzId) {
            Quizz.index = index;
            Quizz.quizzStatus = "draft";
            Quizz.findStatus = true;
            return;
        }
    })

    if (Quizz.quizzStatus != true) {
        appData.finish.forEach((quizz, index) => {
            if (quizz.id == currentQuizzId) {
                Quizz.index = index;
                Quizz.quizzStatus = "finish";
                Quizz.findStatus = true;
                return;
            }
        })
    }

    return Quizz;
}

function updateQuizz() {
    const updateButtons = document.querySelectorAll(".content__body--quizz > h1 > button");
    updateButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Bạn dã click vào button !");

            const id = e.target.closest("[id]").id;

            const currentAppData = JSON.parse(localStorage.getItem("appData"));

            const Quizz = findIndexAndStatusOfQuizz(id, currentAppData);
            
            sessionStorage.setItem("pickQuizz",JSON.stringify(Quizz));

            window.location.href = "/edit/";
        })
    })
}

function deleteObjectQuizz(quizzId) {
    let isSuccess = false;
    const currentAppData = JSON.parse(localStorage.getItem("appData"));
    if (isSuccess != true) {
        currentAppData.finish.forEach((quizz, index) => {
            if (quizz.id == quizzId) {
                currentAppData.finish.splice(index, 1);
                isSuccess = true;
            }
        })
    }
    if (isSuccess != true) {
        currentAppData.draft.forEach((quizz, index) => {
            if (quizz.id == quizzId) {
                currentAppData.draft.splice(index, 1);
                isSuccess = true;
            }
        })
    }

    if (isSuccess)
        localStorage.setItem("appData", JSON.stringify(currentAppData));

    return isSuccess;
}

function deleteQuizz() {
    const buttons = document.querySelectorAll('.content__body--quizz-delete');
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const quizzId = e.target.closest("[id]").id;

            const isSuccess = deleteObjectQuizz(quizzId);
            if (isSuccess) {
                console.log("Xóa object thành công");
                renderQuizz();
            }
            else
                console.log("Đã xóa object thất bại");
        })
    })
}

const quizzesContainer = document.querySelector(".content__body");
quizzesContainer.addEventListener('click',(e) => {
    e.preventDefault();
    e.stopPropagation();

    const quizzChoosen = e.target.closest('.content__body--quizz');

    if(quizzChoosen != null){

        const updateButton = document.querySelector(`#${quizzChoosen.id} > h1  > button`);
        const deleteButton = document.querySelector(`#${quizzChoosen.id} > p  > span`);

        if(e.target !== updateButton && e.target !== deleteButton){
            let currentAppData = JSON.parse(localStorage.getItem("appData"));
            const Quizz = findIndexAndStatusOfQuizz(quizzChoosen.id,currentAppData);
            Quizz.id = quizzChoosen.id;
            sessionStorage.setItem("testQuizz",JSON.stringify(Quizz));

            window.location.href = '/test/';
        }
    }

})