let extras = document.querySelectorAll(".extras p");
let howOften = document.querySelectorAll(".how-often span");

extras.forEach(extra => {
    extra.addEventListener("click", () => {
        extra.classList.toggle("active")
    })
})

howOften.forEach(choice => {
    choice.addEventListener("click", () => {
        howOften.forEach(element => {
            element.classList.remove("active")
        })
        choice.classList.add("active")
    })
})

$('[data-toggle="datepicker"]').datepicker();
$('[data-toggle="timepicker"]').timepicker();
$('[data-payment="cardnumber"]').payment('formatCardNumber');
$('[data-payment="expiry"]').payment('formatCardExpiry');
$('[data-payment="cvc"]').payment('formatCardCVC');

        

$('.booking-submit').click((e) => {
    e.preventDefault()

    let data = {}
    data.extras = [];
    data.howOften = "";

    $(".extras p").each(function() {
        if ($(this).attr("class") === "active") {
            data.extras.push($(this).children("span").text())
        }
    })

    $(".how-often span").each(function() {
        if ($(this).attr("class") === "active") {
            data.howOften = $(this).text()
        }
    })

    $("form :input").each(function() {
        data[$(this).attr("name")] = $(this).val()
    })


    let errors = []

    
    if (data.date === "") {
        errors.push({ type: "date", msg: "Please input the date" })
    }
    else if (data.time === "") {
        errors.push({ type: "time", msg: "Please input the time" })
    }
    else if (data.firstname === "") {
        errors.push({ type: "firstname", msg: "Please input the firstname" })
    }
    else if (data.lastname === "") {
        errors.push({ type: "lastname", msg: "Please input the lastname" })
    }
    else if (data.email === "") {
        errors.push({ type: "email", msg: "Please input the email" })
    }
    else if (data.phonenumber === "") {
        errors.push({ type: "phonenumber", msg: "Please input your phone number" })
    }
    else if(data.address === "") {
        errors.push({ type: "address", msg: "Please input the address" })
    }
    else if (data.city === "") {
        errors.push({ type: "city", msg: "Please input the city" })
    }
    else if (data.state === "") {
        errors.push({ type: "state", msg: "Please input the state" })
    }
    else if (data.zipcode === "") {
        errors.push({ type: "zipcode", msg: "Please input the zipcode" })
    }
    else if (data.cardnumber === "") {
        errors.push({ type: "cardnumber", msg: "Please input the card number" })
    }
    else if (data.cvc === "") {
        errors.push({ type: "cvc", msg: "Please input the cvc" })
    }
    else if (data.expirydate === "") {
        errors.push({ type: "expirydate", msg: "Please input the expirydate" })
    }

    $(".error").text(errors[0].msg)

    console.log(data)
})

const calculateTotal = () => {
    let serviceType = $(".service-type").val();
    let bedroomIncrement = 15
    if(serviceType !== "Regular") {
        bedroomIncrement = 15
    }

    $("input, select").each(function() {
        $(this).change(function() {
            $(".bedrooms").text($("select[name=bedroom]").val())
            $(".bedrooms-value").text("$" + $("select[name=bedroom]").find(':selected').data('amount'))
            $(".bathrooms").text($("select[name=bathroom]").val())
            $(".bathrooms-value").text("$" + $("select[name=bathroom]").find(':selected').data('amount'))
            $(".kitchens").text($("select[name=kitchen]").val())
            $(".kitchens-value").text("$" + $("select[name=kitchen]").find(':selected').data('amount'))
            $(".dirty").text($("select[name=dirty]").val())
            $(".dirty-value").text("$" + $("select[name=dirty]").find(':selected').data('amount'))
        })
    })

    $(".extras p").each(function() {
        $(this).click(function() {
            let selectedclass = $(this).children("span").text()
            if($(this).hasClass("active")) {
                let li = $("<li></li>");
                let span = $("<span></span>").text($(this).text())
                let span2 = $("<span></span>").text($(this).data('amount'))

                li.addClass("extras").addClass(selectedclass).append(span, span2)

                $(".info-inner ul").append(li)
            }
            else {
                $(".info-inner ul li.extras").each(function() {
                    if($(this).hasClass(selectedclass)) {
                        $(this).remove()
                    }
                })
            }
        })
    })

    $(".how-often span").each(function() {
        $(this).click(function() {
            console.log($(this).text())
            if($(this).hasClass("active")) {
                $(".how-often-option").text($(this).text())
            }
        })
    })
}

calculateTotal()

