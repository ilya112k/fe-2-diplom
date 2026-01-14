import telIcon from './../assets/footer-contact-icon-phone.png';
import emailIcon from './../assets/footer-contact-icon-email.png';
import skypeIcon from './../assets/footer-contact-icon-skype.png';
import addressIcon from './../assets/footer-contact-icon-location.png';

export const contacts = [
    {
        href: "tel:88000000000",
        src: telIcon,
        alt: "Телефон",
        desc: "8 (800) 000 00 00",
    },
    {
        href: "mailto:inbox@mail.ru",
        src: emailIcon,
        alt: "Электронная почта",
        desc: "inbox@mail.ru",
    },
    {
        href: "Skype:tu.train.tickets?call",
        src: skypeIcon,
        alt: "Скайп",
        desc: "tu.train.tickets",
    },
    {
        href: "https://yandex.ru/maps/-/CDFwyMjA",
        src: addressIcon,
        alt: "Адрес на карте",
        desc: "г. Москва ул. Московская 27-35 555 555",
    },
];