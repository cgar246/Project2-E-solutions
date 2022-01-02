async function pickClickHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length-1 
  ];
  const response = await fetch('/api/courses/pick', {
    method: 'PUT',
    body: JSON.stringify({
      course_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.pick-btn').addEventListener('click', pickClickHandler); 
