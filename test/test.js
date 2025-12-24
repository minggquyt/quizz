let quizzId = null;
let quizzStatus = null;
let currentQuizz = null

document.addEventListener("DOMContentLoaded",(e) => {
    e.preventDefault();
    e.stopPropagation();

    let currentSession = JSON.parse(sessionStorage.getItem("testQuizz"));
    if(currentSession){
    
        quizzId = currentSession.id;
        quizzStatus = currentSession.quizzStatus;

        const currentAppData = JSON.parse(localStorage.getItem("appData"));
        quizzId = currentSession.id;
        quizzStatus = currentSession.quizzStatus;

        currentAppData[quizzStatus].forEach((quizz) => {
            if(quizz.id === quizzId){
                currentQuizz = quizz;
                return;
            }
        })

        renderCorrespondQuestion();
    }
    else
        console.log("Chưa tồn tại session storage !");
})

const closeButton = document.querySelector('.content__title > span');
closeButton.addEventListener('click',(e) => {
    e.preventDefault();
    e.stopPropagation();

    window.location.href = "/";
})

function renderCorrespondQuestion(){

    console.log(currentQuizz);

    const container = document.querySelector(".content__test_container");
    currentQuizz.sentences.forEach((sentence) => {
        container.innerHTML += (
            `<div class="content__test_card" id=${sentence.id}>
                <div class="content__test_card_header">
                    <div class="content__test_card_header--left_content">
                        <p class="be-vietnam-pro-regular">Câu hỏi</p>
                        <h1 data-value="question" class="be-vietnam-pro-extrabold">${sentence.question}</h1>
                    </div>
                    <div class="content__test_card_header--right_content">
                        <p class="be-vietnam-pro-regular">1/20</p>
                        <img src="" alt="image">
                    </div>
                </div>
                <div class="content__test_card_body">
                    <p class="be-vietnam-pro-regular">Chọn đáp án đúng</p>
                    <div class="content__test_card_body--answer be-vietnam-pro-regular">
                        <button data-value="correctanswer">${sentence['correct-answer']}</button>
                        <button data-value="wronganswer1" >${sentence['wrong-answer'][0]}</button>
                        <button data-value="wronganswer2" >${sentence['wrong-answer'][1]}</button>
                        <button data-value="wronganswer3" >${sentence['wrong-answer'][2]}</button>
                    </div>
                </div>
            </div>`
        )
    })
}

// VẤN ĐỀ 1: ONCLICK LÊN CÂU HỎI -> LƯU LẠI STATE + ĐÁP ÁN ĐÚNG
// ONCLICK -> UI HIỂN THỊ USER ĐÃ CLICK VÀO ĐÁP ÁN ĐÓ 
// LOGIC UPDATE LÊN LS
// VẤN ĐỀ 2: LÀM TRANG KẾT QUẢ 