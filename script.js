const questions = [
  { id: 'question1', options: { software: 2, environmental: 1, research: 1, engineering: 1, data: 1, medical: 0, aerospace: 0, chemical: 0 } },
  { id: 'question2', options: { software: 0, environmental: 2, research: 1, engineering: 0, data: 1, medical: 0, aerospace: 0, chemical: 1 } },
  { id: 'question3', options: { software: 1, environmental: 0, research: 2, engineering: 1, data: 0, medical: 0, aerospace: 0, chemical: 1 } },
  { id: 'question4', options: { software: 0, environmental: 1, research: 1, engineering: 2, data: 1, medical: 0, aerospace: 1, chemical: 0 } },
  { id: 'question5', options: { software: 1, environmental: 0, research: 1, engineering: 0, data: 2, medical: 1, aerospace: 0, chemical: 0 } },
  { id: 'question6', options: { software: 1, environmental: 0, research: 1, engineering: 1, data: 0, medical: 2, aerospace: 0, chemical: 0 } },
  { id: 'question7', options: { software: 0, environmental: 1, research: 1, engineering: 1, data: 0, medical: 1, aerospace: 1, chemical: 0 } },
  { id: 'question8', options: { software: 0, environmental: 2, research: 0, engineering: 1, data: 1, medical: 0, aerospace: 0, chemical: 1 } },
  { id: 'question9', options: { software: 1, environmental: 1, research: 1, engineering: 1, data: 1, medical: 0, aerospace: 0, chemical: 0 } },
  { id: 'question10', options: { software: 0, environmental: 1, research: 1, engineering: 2, data: 1, medical: 1, aerospace: 0, chemical: 0 } }
];

function submitQuiz() {
  let scores = { software: 0, environmental: 0, research: 0, engineering: 0, data: 0, medical: 0, aerospace: 0, chemical: 0 };

  questions.forEach(question => {
      const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
      if (selectedOption) {
          scores[selectedOption.value] += question.options[selectedOption.value];
      }
  });

  const career = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  localStorage.setItem('career', career);
  localStorage.setItem('careerDescription', getCareerDescription(career));
  window.location.href = 'result.html';
}

function getCareerDescription(career) {
  const descriptions = {
      software: "You have a strong interest in technology and enjoy solving complex problems through programming. A career in software development would allow you to create innovative solutions and work on cutting-edge technologies.",
      environmental: "You are passionate about making a difference in the world and addressing environmental issues. A career in environmental science would let you work on conservation projects and promote sustainability.",
      research: "You are curious and enjoy conducting experiments and analyzing data. A career in scientific research would allow you to explore new discoveries and contribute to advancements in your field.",
      engineering: "You have a knack for designing and building things. A career in engineering would enable you to work on diverse projects and create practical solutions to real-world problems.",
      data: "You are skilled at analyzing data and finding patterns. A career in data science would let you work with large datasets and provide valuable insights to drive decision-making.",
      medical: "You are interested in improving health outcomes and patient care. A career in medicine or healthcare would allow you to diagnose and treat patients, making a significant impact on their lives.",
      aerospace: "You are fascinated by space exploration and advanced technology. A career in aerospace engineering would give you the opportunity to work on spacecraft and contribute to space missions.",
      chemical: "You enjoy working with chemicals and developing new products. A career in chemical engineering would involve conducting experiments and working on chemical processes to create innovative solutions."
  };

  return descriptions[career];
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  if (form) {
      let currentQuestion = 1;
      const totalQuestions = 10;

      function showQuestion(questionNumber) {
          for (let i = 1; i <= totalQuestions; i++) {
              document.getElementById(`question${i}`).style.display = (i === questionNumber) ? 'block' : 'none';
          }
      }

      showQuestion(currentQuestion);

      form.addEventListener('change', (event) => {
          if (event.target.matches('input[type="radio"]')) {
              if (currentQuestion < totalQuestions) {
                  currentQuestion++;
                  showQuestion(currentQuestion);
              } else {
                  submitQuiz();
              }
          }
      });
  }

  const career = localStorage.getItem('career');
  const careerDescription = localStorage.getItem('careerDescription');

  if (career && careerDescription) {
      document.getElementById('careerName').textContent = career.charAt(0).toUpperCase() + career.slice(1);
      document.getElementById('careerDescription').textContent = careerDescription;
  }
});
