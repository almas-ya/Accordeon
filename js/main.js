$(document).ready(function () { // DOM u bilan ishlashga tayyor

    function accordion(parentSelector, itemSelector, itemActiveClass, headSelector, contentSelector, duration) { // biz funktsiyani e'lon qilamiz va parametrlarni qabul qilamiz

        let locked = false // animatsiya faol bo'lganda bosishni blokirovka qilish uchun o'zgaruvchini e'lon qilamiz

        $(parentSelector).click(function (e) { // selektori birinchi parametr sifatida qabul qilingan asosiy blokni bosganingizda (parentSelector)

            const target = $(e.target) // chertish doimiy bo'lgan elementni yozamiz
            const item = target.closest(itemSelector) // biz ikkinchi parametr (itemSelector) sifatida berilgan selektor tomonidan chertish bo'lgan eng yaqin asosiy blokni qidiramiz
            const itemHead = item.find(headSelector) // bosish bo'lgan blokda sarlavha (4-parametr) qidiramiz
            const itemContent = item.find(contentSelector) // bosish bo'lgan blokdagi (5-parametr) tarkib blokini qidiramiz

            const siblings = item.siblings() // bosish bo'lgan blok bilan bir xil darajada joylashgan qo'shni bloklarni qidiramiz
            const siblingsContent = siblings.find(contentSelector) // qo'shni bloklardan tarkib blokini (5-parametr) qidiramiz

            if (!target.closest(headSelector).length) return // agar chertish sarlavha blokida bo'lmasa, biz funktsiyani to'xtatamiz, ya'ni biz hech narsa qilmaymiz

            if (locked) return // agar chertish bloklangan bo'lsa, biz ham funktsiyani to'xtatamiz

            if (!item.hasClass(itemActiveClass)) { // agar chertilgan blok faol classga ega bo'lmasa
                locked = true // klikni blokirovka qilamiz
                siblings.removeClass(itemActiveClass) // faol classnii qo'shni bloklardan olib tashlaymiz
                siblingsContent.slideUp(duration) // qo'shni bloklardagi kontent blokini qulab tushirish (6 parametr - davomiyligi - animatsiya davomiyligi)
                item.addClass(itemActiveClass) // bosish bo'lgan blokga faol classnii qo'shamiz
                itemContent.slideDown(duration, function () { // klik bo'lgan blok yaqinidagi tarkib blokini kengaytiramiz, animatsiya tugagandan so'ng, chertishni blokirovka qilish uchun boshqa funktsiyani ishga tushiramiz
                    locked = false
                })
            } else { // agar chertilgan blok faol classga ega bo'lsa
                locked = true // klikni blokirovka qilamiz
                item.removeClass(itemActiveClass) // faol classnii bosish bo'lgan blokga olib tashlaymiz
                itemContent.slideUp(duration, function () { // chertish bo'lgan blok yaqinidagi tarkib blokini qulflaymiz, animatsiya tugagandan so'ng, chertishni blokirovka qilish uchun boshqa funktsiyani ishga tushiramiz
                    locked = false
                })
            }
        })
    }

    accordion('.about-items', '.about-item', 'about-item_active', '.about-item__head', '.about-item__body', 300) // funktsiyani parametrlar bilan boshqaramiz

    accordion('.briefly-cards', '.briefly-card', 'briefly-card_active', '.briefly-card__head', '.briefly-card__text', 600) // agar shunga o'xshash menyular mavjud bo'lsa-da, lekin class nomlari boshqacha bo'lsa, biz boshqa funktsiyalarni o'tkazib, bir xil funktsiyani bajaramiz

})