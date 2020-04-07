import * as $ from "jquery";
import '@chenfengyuan/datepicker';
import '@chenfengyuan/datepicker/dist/datepicker.min.css';
import IMask from 'imask';

let contacts = [];

$(document).ready(function () {
    contacts = JSON.parse(localStorage.getItem('contacts') || []);
    if(contacts.length) {
        showContact(contacts);
    }

    // Make grid view active
    $('.grid-btn').addClass('active');

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
                d: {mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2},
                m: {mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2},
                Y: {mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4}
            }
        }
    );

    function showContact(contactsToShow) {
        let html = '';
        contactsToShow.forEach(function (contact, i) {
            html += `
        <figure class="card" data-index="${i}">
        <div class="name-card-item">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                 class="svg-inline&#45;&#45;fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512">
                <path fill="#9B59B6"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            <div class="full-name">
                <p class="first-name">${contact.firstName}</p>
                <p class="last name">${contact.lastName}</p>
            </div>
        </div>
        <p class="birthday-item">Birthday: ${contact.birthDay}</p>
        <p>Email: <a href="mailto:${contact.emailAddress}">${contact.emailAddress}</a></p>
        <button type="button" class="close-btn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                 class="svg-inline&#45;&#45;fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 352 512">
                <path fill="#919191"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
            </svg>
        </button>
    </figure>
        `
        });
        $('.contact-items').html(html)
    }

    $("form").submit(function (event) {
        event.preventDefault();

        const firstName = $("#first-name-field").val();
        const lastName = $("#last-name-field").val();
        let birthDay = $("#date-of-birth").val();
        const emailAddress = $("#email").val();
        if (birthDay === 'dd.mm.yyyy') {
            birthDay = '';
        }

        const newContact = {
            firstName, lastName, birthDay, emailAddress
        };

        contacts.push(newContact);

        showContact(contacts);

        $("form")[0].reset();

        localStorage.setItem('contacts', JSON.stringify(contacts));
    });

    $("#search-tool").on("keyup", function() {
        const value = $(this).val().toLowerCase();
        contacts.filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(".contact-nav").on('click', '.button', function (e) {
        if ($(this).hasClass('grid-btn')) {
            $('.grid-btn').addClass('active');
            $('.list-btn').removeClass('active');
            $('.contact-cards .contact-items').removeClass('list').addClass('grid');
        } else if ($(this).hasClass('list-btn')) {
            $('.list-btn').addClass('active');
            $('.grid-btn').removeClass('active');
            $('.contact-cards .contact-items').removeClass('grid').addClass('list');
        }
    });

    $(".contact-items").on('click', '.close-btn', function () {
        if (!confirm("Are you sure to delete contact?")) {
            return false
        }
        const thisCard = $(this).parent('.card');
        const idxToDelete = thisCard.data('index');
        contacts.splice(idxToDelete, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        $(thisCard).fadeOut(300, () => {
            showContact(contacts);
        });
    });
});



