const form = document.getElementById("vote-form");
form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=party]:checked").value;
  const data = { party: choice };

  fetch("http://localhost:3003/crpolling", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  e.preventDefault();
});

fetch("http://localhost:3003/crpolling")
  .then((res) => res.json())
  .then((data) => {
    let votes = data.votes;
    let totalVotes = votes.length;

    let voteCounts = {
      ABVP: 0,
      SFI: 0,
      KSU: 0,
      MSM: 0,
    };

    voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.party] = (acc[vote.party] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    let dataPoints = [
      {
        label: "ABVP",
        y: voteCounts.APVP,
      },
      {
        label: "SFI",
        y: voteCounts.SFI,
      },
      {
        label: "KSU",
        y: voteCounts.KSU,
      },
      {
        label: "MSM",
        y: voteCounts.MSM,
      },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme3",
        title: {
          text: `${totalVotes} Total Legal Votes Till Now!!!`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      var Pusher = new Pusher("ec27827143298aa52073", {
        cluster: "ap2",
        encrypted: true,
      });

      var channel = pusher.subscribe("cr-poll");

      channel.bind("cr-vote", function (data) {
        dataPoints.forEachmap((point) => {
          if (point.label == data.party) {
            point.y += data.points;
            totalVotes += data.points;
          } else {
            return point;
          }
        });
        chart.render();
      });
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
