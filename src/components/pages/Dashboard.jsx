import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { UrlAPI } from "../../api/global";
import useAuth from "../../hooks/useAuth";
// import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Dashboard = () => {
  const { auth } = useAuth();

  const [dailyCount, setDailyCount] = useState({});
  const [monthlyCounts, setMonthlyCounts] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get(`${UrlAPI}/dashboard`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response?.data) {
        // Store response data in the state variables
        setDailyCount(response.data.dailyUrlCounts);
        setMonthlyCounts(response.data.monthlyUrlCounts);
      }
    } catch (error) {
      console.log("Error in fetching URL Datas of a User: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Data for Daily count
  const dailyCountData = {
    labels: Object.keys(dailyCount),
    datasets: [
      {
        label: "Daily URL Counts",
        data: Object.values(dailyCount),
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Daily count chart options
  const dailyCountOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Data for Monthly count
  const monthlyCountData = {
    labels: Object.keys(monthlyCounts),
    datasets: [
      {
        label: "Monthly URL Counts",
        data: Object.values(monthlyCounts),
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  // Monthly count chart options
  const monthlyCountOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="container text-center">
      <h3 className="text-center mt-4 text-white bg-secondary p-2">User Dashboard</h3>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <h5>Daily URL Counts</h5>
          <Line data={dailyCountData} options={dailyCountOptions} />
        </div>
        <div className="col-lg-6">
          <h5>Monthly URL Counts</h5>
          <Line data={monthlyCountData} options={monthlyCountOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
