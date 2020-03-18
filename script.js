import $ from "jquery";
import '@chenfengyuan/datepicker';
import '@chenfengyuan/datepicker/dist/datepicker.min.css';
import IMask from 'imask';

$(document).ready(function () {

    $('#date-of-birth').datepicker({
        trigger: ".calendar-btn",
        format: 'dd.mm.yyyy'
    });

    const overwriteMask = IMask(
        document.getElementById('date-of-birth'),
        {
            mask: Date,
            lazy: false,
            overwrite: true,
            autofix: true,
            blocks: {
                d: {mask: IMask.MaskedRange, placeholderChar:'d', from: 1, to: 31, maxLength: 2},
                m: {mask: IMask.MaskedRange, placeholderChar:'m', from: 1, to: 12, maxLength: 2},
                Y: {mask: IMask.MaskedRange, placeholderChar:'y', from: 1900, to: 2999, maxLength: 4}
            }
        }
    );

    $("form").submit(function (event) {
        event.preventDefault();

        const firstName = $("#first-name-field").val();
        const lastName = $("#last-name-field").val();
        const birthDay = overwriteMask.typedValue ? $("#date-of-birth").val() : '';
        const emailAddress = $("#email").val();
        // console.log(firstName, lastName, birthDay, emailAddress);

        const card = (`
        <figure class="card">
        <div class="name-card-item">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                 class="svg-inline&#45;&#45;fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512">
                <path fill="#9B59B6"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            <div>
                <p class="first-name">${firstName}</p>
                <p class="last name">${lastName}</p>
            </div>
        </div>
        <p>Birthday: ${birthDay}</p>
        <p>Email: <a href="mailto:${emailAddress}">${emailAddress}</a></p>
        <button type="button" class="close-btn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                 class="svg-inline&#45;&#45;fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 352 512">
                <path fill="#919191"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
            </svg>
        </button>
    </figure>
        `);

        $("form")[0].reset();

        $(card).appendTo(".contact-cards");

    });

    $(".contact-cards").on('click', '.close-btn', function (event) {
        const thisCard = $(this).parent('.card');
        $(thisCard).fadeOut(300);
    })



});



