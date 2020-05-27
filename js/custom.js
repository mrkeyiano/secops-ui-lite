const wrapper = document.querySelector('.info-retrieved-inner')

/**
 * @description this generates html code for each value and key provided
 *
 * @param {*} key
 * @param {*} value
 * @returns
 */
const populateHtml = (key, value) => {
    return `
                <div class="key">
                    <h4>${key}:</h4>
                </div>
                <div class="value" id="full-name-value">
                    <p>${value}</p>
                </div>
            `
}
/**
 * this is to populate the values and the keys in html
 */
const populateData = (data) => {
    const dataKeys = Object.keys(data)
    for (let i = 0; i < dataKeys.length; i += 1) {
        if (dataKeys[i] !== 'base64image') {
            const div = document.createElement('div')
            div.classList.add('info')
            div.innerHTML = populateHtml(dataKeys[i], data[dataKeys[i]])
            wrapper.appendChild(div)
        } else {
            $('#user_image').attr('src', `data:image/png;base64,${data['base64image']}`)
        }
    }
}

let errorField = document.querySelector('#error')
let loader = document.querySelector('#loader')

const getData = (e) => {
    e.preventDefault()
    error.innerHTML = ''
    let bvn = $('#bvn').val()
    let accountNumber = $('#account-number').val()
    let bankcode = $('#bankcode').val();

    if (bvn.length === 11) {
        loader.classList.remove('d-none')
        $.post(
            'https://secops.patriciadev.com/api/verify/bvn',
            {
                bvn,
            },
            (response) => {
                if (response.statuscode == '00') {
                    populateData(response.data)
                    $('#userDetailsHolder').modal('show')
                } else {
                    toastr.error(response.message, 'Error!')
                }
                loader.classList.add('d-none')
            }
        ).fail((error) => {
            loader.classList.add('d-none')
            console.log(error)
        })
    } else if(accountNumber.length === 10) {
        loader.classList.remove('d-none')
        $.post(
            'https://secops.patriciadev.com/api/verify/bvn',
            {
                'accountNumber' : accountNumber, 'bankcode' : bankcode,
            },
            (response) => {
                if (response.statuscode == '00') {
                    populateData(response.data)
                    $('#userDetailsHolder').modal('show')
                } else {
                    toastr.error(response.message, 'Error!')
                }
                loader.classList.add('d-none')
            }
        ).fail((error) => {
            loader.classList.add('d-none')
            console.log(error)
        })


    }

    else {
        error.innerHTML = 'A valid BVN or Account Number is required'
    }


}

$('#userDetailsHolder').on('hidden.bs.modal', function () {
    wrapper.innerHTML = ''
})



function populateSelect() {

    $.getScript("js/banks.js", function () {

        // THE JSON ARRAY.


        var ele = document.getElementById('bankcode');
        for (var i = 0; i < banklist.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            ele.innerHTML = ele.innerHTML +
                '<option value="' + banklist[i]['bankcode'] + '">' + banklist[i]['bankname'].toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase()) + '</option>';
        }

    });

}