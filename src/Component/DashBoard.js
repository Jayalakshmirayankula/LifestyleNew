import React, { useRef, useState } from 'react';
import bag from '../Asserts/bag.svg';
import gift from '../Asserts/gift.svg';
import tag from '../Asserts/tag.svg';
import '../Container/Lifestyle.css';

const DashBoard = ({ lifestyleData }) => {
    const [showRedeem, setShowRedeem] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [redeemAmount, setRedeemAmount] = useState(0);
    const redeemRef = useRef(null);

    const scrollToRedeem = () => {
        setShowRedeem(true);
        setShowReview(false);
        setTimeout(() => {
            redeemRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleRedeemChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value <= lifestyleData.rewards) {
            setRedeemAmount(value);
        } else if (value > lifestyleData.rewards) {
            setRedeemAmount(Number(lifestyleData.rewards));
        } else {
            setRedeemAmount(0);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard_card">
                <div className="dashboard_card_header">
                    <div>
                        <button className="dash_logo">Lifestyle</button>
                    </div>
                    <div className="rev_hed">
                        <p className="rev">Lifestyle Rewards Credit Card</p>
                    </div>
                </div>

                <div className="top-stats">
                    <div>
                        <p>Available Rewards Points</p>
                        <p className="highlight">{lifestyleData.availableRewards} points</p>
                        <button onClick={scrollToRedeem} className="link-button">
                            Find ways to Redeem
                        </button>
                    </div>
                    <div id="free">
                        <p>Free Shipping</p>
                        <p className="highlight">{lifestyleData.availableRewards}/{lifestyleData.shipping}</p>
                    </div>
                    <div>
                        <p>Monthly Challenge</p>
                        <p className="highlight">{lifestyleData.monthlyChallenge}</p>
                    </div>
                </div>
            </div>

            <div className="rewards_offers">
                <h3>Next Rewards Possible Offers</h3>
                <p>Lifestyle rewards shop small and earn more</p>

                <div className="offer-cards">
                    <div className="offer-card">
                        <div className="offer-header-container">
                            <h2 className="offer-header">Suggested For You</h2>
                            <div className="gift_icon"><img src={gift} alt="Gift Icon" /></div>
                        </div>
                        <p>Earn 5 Points for every $1 spent as a cardmember across our family brands</p>
                    </div>

                    <div className="offer-card">
                        <div className="offer-header-container">
                            <h2 className="offer-header">New Offer</h2>
                            <div className="bag_icon"><img src={bag} alt="Bag" /></div>
                        </div>
                        <p>Lifestyle Mastercard cardmembers earn 2 points for every $1 spent outside our family brands</p>
                    </div>

                    <div className="offer-card">
                        <div className="offer-header-container">
                            <h2 className="offer-header">Available Benefit</h2>
                            <div className="tag_icon"><img src={tag} alt="Tag Icon" /></div>
                        </div>
                        <p>Earn 1 Point for every $1 spent at our family of brands as a rewards member</p>
                    </div>
                </div>
            </div>

            {showRedeem && (
                <div ref={redeemRef} className="redeem_section">
                    <h3>Redeem Reward Dollars for a Checkout</h3>

                    {!showReview ? (
                        <>
                            <div className="redeem_card">
                                <div>
                                    <p>Choose a Credit Amount</p>
                                    <p><small>The credit will apply</small></p>
                                </div>
                                <div>
                                    <p>You have {lifestyleData.rewards} reward dollars</p>
                                    <p><small>$1.00 = 1.00 Reward Dollar</small></p>
                                </div>
                            </div>

                            <div className="rewardpoint_card">
                                <div className="rewardpoint1">
                                    <label htmlFor="rewardspoint">Reward Dollars</label>
                                    <input type="number" id="rewardspoint"
                                           value={redeemAmount}
                                           onChange={handleRedeemChange}
                                           max={lifestyleData.rewards}
                                           className="reward-input"
                                    />
                                </div>
                                <div><p>=</p></div>
                                <div className="rewardpoint2">
                                    <button className="blue-button">
                                        Receive a ${redeemAmount.toFixed(2)} statement
                                    </button>
                                </div>
                            </div>

                            <div className="secondary-rewards">
                                <p>View terms & Conditions</p>
                                <button
                                    className={`secondary-button ${redeemAmount > 0 ? 'active' : 'disabled'}`}
                                    disabled={redeemAmount <= 0}
                                    onClick={() => setShowReview(true)}
                                >
                                    Continue to Review
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="review-section">
                            <div className="borderleft">
                                <div className="borderheader">
                                    <h4>Review</h4>
                                    <div className="redeem_card">
                                        <p>Redeem</p>
                                        <p className="reward_dollars">{redeemAmount} Reward Dollars</p>
                                    </div>
                                </div>

                                <div className="borderright">
                                    <p>Receive</p>
                                    <span className="dallor">${redeemAmount.toFixed(2)} Dollars</span>
                                </div>
                            </div>

                            <div className="remaining">
                                <p>Remaining Reward Dollars balance:</p>
                                <span>${(lifestyleData.rewards - redeemAmount).toFixed(2)}</span>
                            </div>

                            <div className="bottom">
                                <p>View terms & Conditions</p>
                                <button className="secondary-button" onClick={() => setShowReview(false)}>
                                    Go Back
                                </button>
                                <button className="review-button">Redeem Now</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashBoard;
