import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaDownload, FaPrint, FaRegCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import "./rewardSummary.css";
import image from '../img/cake2-fill.svg';

function RewardsSummary() {
    const rewardData = useSelector((state) => state.rewards.rewardData);
    const isPendingRewards = useSelector((state) => state.rewards.isPendingRewards);
    const isErrorRewards = useSelector((state) => state.rewards.isErrorRewards);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date("2023-02-01"),
            endDate: new Date("2023-02-28"),
            key: "selection",
        },
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    if (isPendingRewards) return <p>Loading...</p>;
    if (isErrorRewards) return <p>Error loading rewards data</p>;
    if (!rewardData) return <p>No rewards available</p>;

    const filteredData = rewardData.map((item) => ({
        ...item,
        parsedDate: parse(item.date + " 2023", "MMM dd yyyy", new Date())
    })).filter((item) => {
        const date = item.parsedDate;
        return date >= dateRange[0].startDate && date <= dateRange[0].endDate;
    });
/*    const totalRows = rewardData.length;*/
    const rowsShown = filteredData.length;

    return (
        <>
            <div className="rewards-summary">
                <div className="rewards-title">
                    <span className="reward-label">Your Reward Dollars Activity</span>
                    <div className="icons">
                        <FaDownload className="icon" />
                        <FaPrint className="icon" />
                    </div>
                </div>

                <div className="activity-container">
                    <div className="activity-header">
                        <div className="date-range-container">
                            <label className="label">Start Date - End Date</label>
                            <div className="input-wrapper" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                                <span className="date-text">
                                    {`${format(dateRange[0].startDate, "MM/dd/yyyy")} - ${format(dateRange[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                <div className="divider" />
                                <FaRegCalendarAlt className="calendar-icon" />
                            </div>

                            {isCalendarOpen && (
                                <div className="calendar-popup">
                                    <DateRange editableDateInputs onChange={handleSelect} moveRangeOnFirstSelection={false} locale={enUS} ranges={dateRange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <table className="activity-table">
                        <thead>
                        <tr>
                            <th>DATE</th>
                            <th>CARD</th>
                            <th>DESCRIPTION</th>
                            <th>AMOUNT</th>
                            <th>REWARDS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{format(item.parsedDate, "MMM dd")}</td>
                                    <td>{item.card}</td>
                                    <td className="extra-gap">{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.rewards}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No data available in selected range</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <p className="bottom-label">Showing {rowsShown} of 3</p>
                </div>
            </div>

            <div className="birthday-offers">
                <img src={image} alt="cake" className="cake-image" />
                <div className="birthday-ex">
                    <p>EXCLUSIVE BIRTHDAY OFFERS</p>
                    <p>Loyalty members receive exclusive deals from our family of brands around their birthday.</p>
                </div>
                <button className="find-button">Find Process</button>
            </div>
        </>
    );
}

export default RewardsSummary;
