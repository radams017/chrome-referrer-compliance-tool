var nonGTMBtn = document.getElementById("nonGTM-btn");


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
    alert(insertReferrerPolicy(nonGTMTag));
}



nonGTMBtn.addEventListener("click", updateNonGTMTag);

