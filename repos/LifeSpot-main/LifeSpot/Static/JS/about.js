function addLike(id) {
    let element = document.getElementById(id)
    if (!element) return;

    let array = element.innerText.split(' ');

    let resultNum = parseInt(array[array.length - 1], 10);
    if (isNaN(resultNum)) resultNum = 0;

    resultNum += 1;

    array[array.length - 1] = `${resultNum}`;

    element.innerText = array.join(' ');
}
const writeReview = review => {
    let likeCounter = '';

    if (review.hasOwnProperty('rate')) {
        let commentId = 'like-' + Math.random().toString(36).substr(2, 9);
        likeCounter += `<button id="${commentId}" style="border: none; background: none; cursor: pointer; font-size: 1.1em;" onclick="addLike('${commentId}')">❤️ ${review.rate}</button>`;
    }
    const container = document.getElementsByClassName('reviews')[0];
    if (!container) {
        console.error("Контейнер .reviews не найден!");
        return;
    }
    container.innerHTML +=
        `<div class="review-text">
            <p><i><b>${review['author']}</b> — ${review['date']} ${likeCounter}</i></p>
            <p>${review['text']}</p>
        </div>`;
};
function getComment() {
 
    let comment = {};

    comment.author = prompt("Как вас зовут ?");
    if (comment.author == null || comment.author.trim() === "") {
        return;
    }

    comment.text = prompt("Оставьте отзыв");
    if (comment.text == null || comment.text.trim() === "") {
        return;
    }

    comment.date = new Date().toLocaleString("ru-RU");

    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?');

    if (enableLikes) {
        let review = Object.create(comment);
        review.rate = 0;

        writeReview(review);
    } else {
        writeReview(comment);
    }
}