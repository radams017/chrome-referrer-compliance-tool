var nonGTMBtn = document.getElementById("nonGTM-btn");
var gtmBtn = document.getElementById("gtm-btn");
var newFormBtn = document.getElementById("add-ref-form");
var formGroup = document.getElementById("form-group");
var gtmCopy = document.getElementById("gtm-copy")

function insertReferrerPolicy(tag) {
    var policy = "referrerpolicy='no-referrer-when-downgrade'"
    return tag.replace(/(script async)/, `$1 ${policy}`)
}
// tracker tags look like
// <script async src='https://tag.simpli.fi/sifitag/b7c57f80-178c-0137-e079-06a9ed4ca31b'></script>
// so we're finding the part like `sifitag/b7c57f80-178c-0137-e079-06a9ed4ca31b` and replacing with
// that same part + the referer policy.
// To be more robust we should parse out the `src` attribute into a proper URL object
// and then add in the referer query parameter to the object and then re-stringify it.

function insertRefererParameter(tag, ref) {
    var tagMatcher = /(sifitag\/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})/
    return tag.replace(tagMatcher, `$1?referer=${ref}`)
}

function updateNonGTMTag() {
    var nonGTMTag = document.getElementById("nogtm-tag").value;
    var output = insertReferrerPolicy(nonGTMTag)
    var container = document.getElementById('non-gtm-output')
    container.innerHTML = escapeTag(output);
};

function GTMTag() {
    return document.getElementById("gtm-tag").value;
}

function referrers() {
    var inputs = document.getElementsByClassName('parameter-input');
    var params = [];
    for (var i = 0; i < inputs.length; i++) {
        params.push(inputs[i].value)
    }
    return params;
}

function generateGTMTag(tag, ref) {
    var output = insertRefererParameter(tag, encodeURIComponent(ref))
    var container = document.getElementById('gtm-output')
    container.innerHTML += escapeTag(output) + '&#13;&#10';
}

function escapeTag(str) {
    return str.replace(/</, '&lt;').replace(/>/, '&gt;')
}

function generateGTMTags() {
    var container = document.getElementById('gtm-output');
    var tag = GTMTag();
    var refs = referrers();
    for (var i in refs) {
        generateGTMTag(tag, refs[i])
    }
}

function copyToClipboard() {
    var copyText = document.getElementById('gtm-output')
    copyText.select();
    document.execCommand('copy');
}

function createNewForm() {
    var newFormDiv = document.createElement("div");
    var newForm = document.createElement("input");
    newForm.className = "form-control mt-2  parameter-input";
    newFormDiv.className = "input-group col-md-6";
    newForm.setAttribute("placeholder", "Parameter Goes Here");
    formGroup.appendChild(newFormDiv);
    newFormDiv.appendChild(newForm);
};

// gtmCopy.addEventListener("click", copyToClipboard);
nonGTMBtn.addEventListener("click", updateNonGTMTag);
gtmBtn.addEventListener("click", generateGTMTags);
newFormBtn.addEventListener("click", createNewForm);