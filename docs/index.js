function updateNames() {
  const endpoints = document.getElementsByClassName("endpoint");
  Array.from(endpoints).map((e) => {
    const endpointRoute = e.innerText;
    e.innerHTML = `${location.origin}${endpointRoute}`;
  });
}

updateNames();
