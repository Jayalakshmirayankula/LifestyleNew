import React, {useState} from "react";
import {useSelector} from "react-redux";
import {FaDownload, FaPrint, FaRegCalendarAlt} from "react-icons/fa";
import {DateRange} from "react-date-range";
import {format, parse} from "date-fns";
import {enUS} from "date-fns/locale";
import "./rewardSummary.css";
import cakeIcon from '../Asserts/cake2-fill.svg';

function RewardsSummary() {
    const rewardData = useSelector((state) => state.rewards.rewardData);
    const isPending = useSelector((state) => state.rewards.isPendingRewards);
    const isError = useSelector((state) => state.rewards.isErrorRewards);

    const [calendarVisible, setCalendarVisible] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date("2023-02-01"),
            endDate: new Date("2023-02-28"),
            key: "selection",
        },
    ]);

    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection]);
    };

    if (isPending) return <p>Loading rewards...</p>;
    if (isError) return <p>Failed to load rewards data.</p>;
    if (!rewardData) return <p>No rewards available.</p>;

    const filteredData = rewardData.map((item) => ({
        ...item,
        parsedDate: parse(item.date + " 2023", "MMM dd yyyy", new Date())
    })).filter((item) => {
        const date = item.parsedDate;
        return date >= dateRange[0].startDate && date <= dateRange[0].endDate;
    });

    const totalVisible = filteredData.length;

    return (
        <>
            <div className="summary">
                <div className="summary-header">
                    <h2 className="summary-heading">Your Reward Dollars Activity</h2>
                    <div className="action-buttons">
                        <FaDownload className="action-icon"/>
                        <FaPrint className="action-icon"/>
                    </div>
                </div>

                <div className="summary-content">
                    <div className="date-range">
                        <div>
                            <label className="date-label">Start Date - End Date</label>
                            <div className="date-display-box" onClick={() => setCalendarVisible(!calendarVisible)}>
                            <span>
                                {`${format(dateRange[0].startDate, "MM/dd/yyyy")} - ${format(dateRange[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                                <FaRegCalendarAlt className="calendar-icon"/>
                            </div>

                            {calendarVisible && (
                                <div className="calendar">
                                    <DateRange editableDateInputs onChange={handleDateChange}
                                               moveRangeOnFirstSelection={false} locale={enUS} ranges={dateRange}/>
                                </div>
                            )}
                        </div>
                        <div className="select-header">
                            <label className="select">Status</label>
                            <div className="select-body">
                                <select>
                                    <option>All</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table className="activity-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Card</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Rewards</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{format(item.parsedDate, "MMM dd")}</td>
                                    <td>{item.card}</td>
                                    <td className="desc-col">{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.rewards}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{textAlign: "center"}}>No data in selected range</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <p className="row-count">Showing {totalVisible} of {rewardData.length}</p>
                </div>
            </div>

            <div className="birthday-banner">
                <img src={cakeIcon} alt="Birthday Offer" className="birthday-icon"/>
                <div className="birthday-text">
                    <p className="title">Birthday Offers Just for You</p>
                    <p className="subtitle">As a loyalty member, enjoy special deals during your birthday month.</p>
                </div>
                <button className="cta-button">Explore Offers</button>
            </div>
        </>
    );
}

export default RewardsSummary;
