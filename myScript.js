
// global variables to get element from HTML document
const selectTag = document.getElementsByTagName("select")[0];
const inputElement = document.getElementsByTagName("input")[0];
const submitBtn = document.getElementsByTagName("button")[0];
const outPut = document.getElementsByClassName("output")

const oppoStatus = [
    {
        "K_OPPO_STATUS": 1,
        "STATUS": "1. Initial Contact",
        "SUCCESS": 0
    },
    {
        "K_OPPO_STATUS": 2,
        "STATUS": "2. Demonstration",
        "SUCCESS": 25
    },
    {
        "K_OPPO_STATUS": 3,
        "STATUS": "3. Proposal",
        "SUCCESS": 50
    },
    {
        "K_OPPO_STATUS": 4,
        "STATUS": "4. Negotiation",
        "SUCCESS": 75
    },
    {
        "K_OPPO_STATUS": 5,
        "STATUS": "5. Order",
        "SUCCESS": 100
    }
];

const FormComponent = class {
    constructor() {

    }
    start() {

        this.buttonWraper();
        this.createOptionElements();
        this.fillSuccessRateAccordingly();
        this.submit();
    }

    /* Methods------------------------ */

    // Method to wrap button element into a dev
    buttonWraper() {
        var btn = submitBtn;
        var wrapper = document.createElement('div');
        btn.parentNode.insertBefore(wrapper, btn);
        wrapper.appendChild(btn);
    }

    // Method to create opptions for the select element using the data from the oppoStatus object above
    createOptionElements() {

        for (var select of oppoStatus) {
            // first node in dom element of the select
            const newOption = document.createElement('option');
            const optionText = document.createTextNode(select.STATUS);
            newOption.appendChild(optionText);
            newOption.setAttribute('name', "success");
            newOption.setAttribute('value', select.K_OPPO_STATUS);
            newOption.setAttribute('success', select.SUCCESS);

            selectTag.appendChild(newOption);
        }
    }
    // This method assigns the relate success rate to the input box value and store the required data to the session storage
    fillSuccessRateAccordingly() {

        selectTag.addEventListener('click', function (event) {
            let status = selectTag.value;
            for (let i = 0; i < oppoStatus.length; i++) {
                if (oppoStatus[i].K_OPPO_STATUS == status) {
                    inputElement.value = oppoStatus[i].SUCCESS;

                    sessionStorage.setItem("status", status);
                    sessionStorage.setItem("success", oppoStatus[i].SUCCESS);
                }
            }
        });
    };

    // This method retores and uses the requied data from local storage and place it in the dev and then clears the session storage
    submit() {

        submitBtn.addEventListener('click', function (event) {
            event.preventDefault();
            var dataFromSession = { status: sessionStorage.getItem("status"), success: sessionStorage.getItem("success") };
            var jsonData = JSON.stringify(dataFromSession);

            outPut[0].innerHTML = jsonData;
            localStorage.clear();
        });
    }
}
const fc = new FormComponent();
fc.start();
