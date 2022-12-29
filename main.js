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
$('[data-payment="cardnumber"]').payment('formatCardNumber');
$('[data-payment="expiry"]').payment('formatCardExpiry');
$('[data-payment="cvc"]').payment('formatCardCVC');

        
// Validation of form when submit button is clicked
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

    $(".error").text("")
    // Display the first error encountered in list
    $(".error").text(errors[0].msg)

    // Send all data to backend
    console.log(data)
})


// Booking summary calculator 
const calculateTotal = () => {

    let bedroomIncrement = 15;
    let startIndex = 95;

    $("input, select").each(function() {
        $(this).change(function() {
            
            let serviceType = $(".service-type").val();
            if(serviceType === "Deep Clean") {
                bedroomIncrement = 7.5
                startIndex = 135
                $(".bedrooms-value").text("$" + startIndex + ".00")
            }  
            else if (serviceType === "Move-Out/Move In") {
                bedroomIncrement = 7.5
                startIndex = 164
                $(".bedrooms-value").text("$" + startIndex + ".00")
            }
            else {
                bedroomIncrement = 15
                startIndex = 95
                $(".bedrooms-value").text("$" + startIndex + ".00")
            }
            if(serviceType === "Move-Out/Move In" && $(this).hasClass("service-type")) {
                $(".about-home").addClass("move")
                let lists = $(`
                    <li class="move-others-option"><span>Inside Oven </span><span class="value">$22.50</span></li>
                    <li class="move-others-option"><span>Inside Fridge </span><span class="value">$30.00</span></li>
                    <li class="move-others-option"><span>Windows</span> <span class="value">$22.50</span></li>
                    <li class="move-others-option"><span>Cabinet</span> <span class="value">$22.50</span></li>`)
                $(".info-inner ul").append(lists)
            }
            else if (serviceType !== "Move-Out/Move In") {
                $(".about-home").removeClass("move")
                $(".info-inner ul li.move-others-option").remove()
            }
            
            
            $(".bedrooms").text($("select[name=bedroom]").val())
            if(serviceType === "Deep Clean" ) {
                $(".bedrooms-value").text("$" + (startIndex + (bedroomIncrement * $("select[name=bedroom]").find(':selected').data('amount'))).toFixed(2))
            } else {
                $(".bedrooms-value").text("$" + (startIndex + (bedroomIncrement * $("select[name=bedroom]").find(':selected').data('amount'))).toFixed(2))
            }
            $(".bathrooms").text($("select[name=bathroom]").val())
            $(".bathrooms-value").text("$" + $("select[name=bathroom]").find(':selected').data('amount'))
            $(".kitchens").text($("select[name=kitchen]").val())
            $(".kitchens-value").text("$" + $("select[name=kitchen]").find(':selected').data('amount'))
            $(".dirty").text($("select[name=dirty]").val())
            $(".dirty-value").text("$" + $("select[name=dirty]").find(':selected').data('amount'));

            calculateTotalValue()
        })  

    })

    $(".extras p").each(function() {
        $(this).click(function() {
            let selectedclass = $(this).children("span").text()
            if($(this).hasClass("active")) {
                let li = $("<li></li>");
                let span = $("<span></span>").text($(this).text())
                let span2 = $("<span></span>").text($(this).data('amount')).addClass("value")

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
            calculateTotalValue()
        })
    })

    $(".how-often span").each(function() {
        $(this).click(function() {
            if($(this).hasClass("active")) {
                $(".how-often-option").text($(this).text())
            }
            calculateTotalValue()
        })
    })

    const calculateTotalValue = () => {
        let total = 0
        let tax = 0
        $(".info-inner .value").each(function() {
            total += parseFloat(($(this).text().replaceAll("$", "")))
        })
        $(".subtotal").text("$"+ (total + 20) + ".00")
        tax = ((total + 20) * 13.379 / 100).toFixed(2)
        $(".tax").text("$"+ tax)
        totalOverall = (total + 20 + parseFloat(tax)).toFixed(2)
        $(".total-overall").text("$"+ totalOverall)
    }
}

calculateTotal()


window.addEventListener("load", () => {
    let optionsArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
    
    $(optionsArray).each((index, value) => {
        let option = $('<option>', {
            value: value,
            text: value
        });
        $("select[name=state]").append(option)
    })
})

$(":input.datepicker").change(() => {
    let date = formatDate($(".datepicker").val())

    let split = $(".datepicker").val().split("/")[1];

    $(".timepicker").empty()
    let heading = $('<option>', {
        text: date[0] + " " + date[1] + " " + date[2],
        disabled: true
    })
    let options = `<option>08:00AM - 10:00AM</option>
                    <option>10:00AM - 12:00PM</option>
                    <option>12:00PM - 02:00PM</option>
                    <option>02:00PM - 04:00PM</option>`

    $(".timepicker").append(heading, options)
    $(".date-info").text($(".datepicker").val() + " " + "@" + " " + $(".timepicker").val())
})

$(".timepicker").change(() => {
    $(".date-info").text($(".datepicker").val() + " " + "@" + " " + $(".timepicker").val())
})

const formatDate = (date) => {
    let splittedDate = date.split("/")

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    result = [];

    result.push(splittedDate[1])
    result.push(months[splittedDate[0] -1])
    result.push(splittedDate[2])
    
    return result;
}