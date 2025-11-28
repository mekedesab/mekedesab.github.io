let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");

// Load experience data from experience.json and populate the tabs
fetch('experience.json')
  .then(response => response.json())
  .then(data => {
    // Work Tab (now first)
    tabContents[0].innerHTML = data.work.map(job => `
      <h4>${job.organization}${job.location ? ' - ' + job.location : ''}</h4>
      <p>${job.role} ${job.period}</p>
      <ul>${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
    `).join('<br>');

    // Education Tab (now second)
    const edu = data.education[0];
    tabContents[1].innerHTML = `
      <h4>${edu.institution} ${edu.period}</h4>
      <i><p>${edu.degree}</p></i>
      <p>Relevant Courses: ${edu.courses.join(', ')}</p>
      <br>
      <h4>Technologies</h4>
      <p><b>Languages:</b></p>
      <p>${edu.technologies.languages.join(', ')}</p>
      <p><b>Development Tools:</b></p>
      <p>${edu.technologies.tools.join(', ')}</p>
      <p><b>CI/CD tools:</b></p>
      <p>${edu.technologies.ci_cd.join(', ')}</p>
    `;

    // Volunteering Tab (now third)
    tabContents[2].innerHTML = data.volunteering.map(vol => `
      <h4>${vol.organization}</h4>
      <i><p>${vol.role} ${vol.period}</p></i>
      <ul>${vol.details.map(d => `<li>${d}</li>`).join('')}</ul>
    `).join('<br>');
  });

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});