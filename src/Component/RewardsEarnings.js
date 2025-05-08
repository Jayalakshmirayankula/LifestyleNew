import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./rewardsEarnings.css";
import lifestyleLogo from '../Asserts/lifestylelogo.png';
import heart from '../Asserts/heartresized.png';
import archive from "../Asserts/Earnings/archive.svg";
import award from "../Asserts/Earnings/award.svg";
import cart from "../Asserts/Earnings/cart2.svg";
import exTraingle from "../Asserts/Earnings/exclamation-triangle.svg";
import lightning from "../Asserts/Earnings/lightning-charge.svg";

function RewardsEarnings() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");
    const fildata = ["ALL", "New", "ExpireSoon", "CashBack", "InStore", "Online"];
    const earningsData = useSelector((state) => state.earnings.earningsData);
    const isPendingEarnings = useSelector((state) => state.earnings.isPendingRewards);
    const isErrorRewardsEarnings = useSelector((state) => state.earnings.isErrorRewards);

    if (isPendingEarnings) return <p>Loading...</p>;
    if (isErrorRewardsEarnings) return <p>Error loading Earnings data</p>;
    if (!earningsData) return <p>No Earnings available</p>;

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (filter) => setActiveFilter(filter);

    const filteredRewards = earningsData.filter((reward) => {
        if (activeFilter !== "ALL" && reward.type !== activeFilter) return false;

        const searchText = searchTerm.toLowerCase();
        const titleMatch = reward.title?.toLowerCase().includes(searchText);
        const descMatch = Array.isArray(reward.description)
            ? reward.description.some(desc => desc.toLowerCase().includes(searchText))
            : reward.description?.toLowerCase().includes(searchText);
        return titleMatch || descMatch;
    });

    return (
        <>
            <div>
        <div className="rewards-Earnings">
            <div className="rewards-Earnings-Header">
            <div className="rewards-earnings-container">
                <p>Rewards & Earnings**</p>
                <span>As you earn points, you'll be able to view them here and redeem rewards in checkout.</span>

                <div className="search-filter-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input2"
                    />
                    <span>Status</span>
                    <input
                        type="text"
                        placeholder="Filter by Type (optional)"
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="refine-filters">
                    <p>Refine by</p>
                    {fildata.map((filter) => (
                        <button
                            key={filter}
                            className={`chip ${activeFilter === filter ? "active" : ""}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter === "ALL" ? `ALL(${earningsData.length})` : filter}
                        </button>
                    ))}
                </div>

                <div className="rewards-table-container">
                    {filteredRewards.length > 0 ? (
                        <table className="rewards-table">
                            <tbody>
                            {filteredRewards.map((reward) => (
                                <tr key={reward.id} className="reward-row">
                                    <td className="reward-type">
                                        <div className="type-label">
                                            {reward.type === "New" && (
                                                <img src={lightning} alt="New" className="lightning"/>
                                            )}
                                            {reward.type === "ExpireSoon" && (
                                                <img src={exTraingle} alt="Expire Soon" className="exTraingle"/>
                                            )}
                                            {reward.type === "CashBack" && (
                                                <img src={award} alt="Cash Back" className="award"/>
                                            )}
                                            {reward.type === "InStore" && (
                                                <img src={cart} alt="In Store" className="cart"/>
                                            )}
                                            {reward.type === "Online" && (
                                                <img src={archive} alt="Online" className="archive"/>
                                            )}
                                            <span className={reward.type}>{reward.type}</span>
                                        </div>
                                    </td>

                                    <td className="reward-description-content">
                                        <div className="reward-title">{reward.title}</div>
                                        {Array.isArray(reward.description)
                                            ? reward.description.map((line, idx) => (
                                                <div key={idx} className="reward-description">{line}</div>
                                            ))
                                            : <div className="reward-description">{reward.description}</div>}
                                    </td>

                                    <td className={`reward-expiry ${reward.expiresIn ? "expires-soon" : ""}`}>
                                        {reward.expiresIn
                                            ? `Expires in ${reward.expiresIn}`
                                            : `Expires on ${reward.expiresOn}`}
                                    </td>

                                    <td>
                                        <button className="add-to-cart">Add to Cart</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-rewards">No rewards found.</p>
                    )}
                </div>
                <p className="bottom-label">
                    Showing {filteredRewards.length} of {earningsData.length}
                </p>
            </div>
            </div>
        </div>
    <div className="rewards-Earnings hart">
        <div className="rewards-details">
            <div className="donate-rewards">
                <div className="donate-icon">
                    <img src={heart} alt="Lifestyle Logo"/>
                    <p>Do Good</p>
                </div>
                <div className="donate-content">
                    <h3>DONATE YOUR REWARDS</h3>
                    <p>Pay It Forward When You Donate Your Rewards To A Good Cause. We’ll Match All Donations Up To USD
                        $1 Million Combined Across Our U.S. & Canada Rewards Programs.</p>
                </div>
                <button className="find-process-button">Find Process</button>
            </div>
        </div>
    </div>

    <div className="rewards-Earnings">
        <div className="bonus-section">
            <div className="bonus-logo">
                <p>Bonus Points</p>
                {/*<img src={lifestyleLogo} alt="Lifestyle Logo"/>*/}
                <div className="lifestyle-logo-container">
                    <span>lifestyle</span>
                </div>
            </div>
            <div className="bonus-content">
                <h3>Want to Earn More Points?</h3>
                <p>Apply For A Lifestyle Rewards Credit Card And Get All The Benefits Of Enthusiast As Soon As You’re
                    Approved – Plus Earn 5 Points Per $1 Spent At Our Family Of Brands With Your New Card!**</p>
            </div>
            <button className="apply-now-button">Apply Now</button>
        </div>
    </div>
            </div>
</>
);
}

export default RewardsEarnings;
