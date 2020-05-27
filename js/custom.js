const data = {
    lastName: 'OBI',
    firstName: 'JUDE',
    watchListed: 'NO',
    enrollmentBranch: 'AWO-OMAMMA',
    gender: 'Male',
    stateOfOrigin: 'Imo State',
    phoneNumber1: '08189927988',
    phoneNumber2: '',
    stateOfResidence: 'Imo State',
    title: 'Mr',
    levelOfAccount: 'Level 1 - Low Level Accounts',
    nin: '',
    nameOnCard: 'OBI CHIBUIKE JUDE',
    registrationDate: '26-Feb-2015',
    bvn: '22197755480',
    email: '',
    dateOfBirth: '02-Jan-1976',
    lgaOfResidence: 'Oru East',
    nationality: 'Nigeria',
    lgaOfOrigin: 'Oru East',
    residentialAddress: 'OBI FAMILY, UMUDURUANOWA KINDRED AT  UMUBOCHI AWO-OMAMMA',
    enrollmentBank: '011',
    middleName: 'CHIBUIKE',
    maritalStatus: 'Married',
}


$('#show-dialog').click(function (e) {
    e.preventDefault();


    let bvn = '';

    $.post('https://secops.patriciadev.com/api/verify/bvn', {
        bvn:  $("#bvn"). val()
    }, (response) => {
        console.log(response);

    }).fail((error) => {

        console.log(error);
    })
});

const dataKeys = Object.keys(data)

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
 * @description capitalizes the parameter.
 *
 * @param {*} val
 * @returns
 */
const capitalize = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1)
}

/**
 * @description this function helps to format the keys to separate them into individual words and capitalize them for user's view
 *
 * @param {*} key
 * @returns String
 */
const formatKey = (key) => {
    const splittedKey = key.split('')
    let upperCaseIndex = splittedKey.findIndex((key) => key === key.toUpperCase())
    if (upperCaseIndex === -1) {
        return capitalize(key)
    } else {
        return capitalize(splittedKey.splice(0, upperCaseIndex).join('')) + ' ' + splittedKey.join('')
    }
}

/**
 * this is to populate the values and the keys in html
 */
for (let i = 0; i < dataKeys.length; i += 1) {
    const div = document.createElement('div')
    div.classList.add('info')
    div.innerHTML = populateHtml(formatKey(dataKeys[i]), data[dataKeys[i]])
    wrapper.appendChild(div)
}
