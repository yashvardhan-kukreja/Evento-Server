/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const UserTransactions = require('../database/users/userTransactions');
const EventTransactions = require('../database/events/eventTransactions');
const ScannableTransactions = require('../database/scannables/scannableTransactions');

// Route for fetching a user's details
module.exports.fetchUserDetails = (id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "Problem fetching user details"});
                else {
                    resolve({success: true, message: "User details fetched successfully", user: outputUser});
                }
            }
        });
    });
};

// Controller for fetching the list of events in which the given user has participated
module.exports.fetchParticipatedEvents = (id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "No such user exists"});
                else {
                    EventTransactions.fetchParticipatedEvents(id, (err, outputEvents) => {
                        if (err) {
                            console.log(err);
                            reject({success: false, message: "An error occurred"});
                        } else {
                            outputEvents ? resolve({success: true, message: "Participated events fetched", events: outputEvents}) : reject({success: false, message: "Participated in no events"});
                        }
                    });
                }
            }
        });
    });
};

// Controller for registering a user in an event
module.exports.registerToAnEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(user_id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "User doesn't exist"});
                else {
                    EventTransactions.findParticipantIdsOfAnEvent(event_id, (err, output) => {
                        if (err) {
                            console.log(err);
                            reject({success: false, message: "An error occurred"});
                        } else {
                            if (!output)
                                reject({success: false, message: "Wrong event ID provided"});
                            else {
                                let ids = output.participants;
                                if (ids.indexOf(user_id) >= 0)
                                    reject({success: false, message: "Already registered to this event"});
                                else {
                                    EventTransactions.addUserToAnEvent(event_id, user_id, (err, outputEvent) => {
                                        if (err) {
                                            console.log(err);
                                            reject({success: false, message: "An error occurred"});
                                        } else {
                                            outputEvent ? resolve({success: true, message: "Registered to the event successfully"}) : reject({success: false, message: "Wrong event ID provided"});
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    });
};

// Controller for verifying whether a user is a coordinator for the event or not
module.exports.verifyCoordinator = (event_id, user_email_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findCoordinatorEmailsOfAnEvent(event_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                let coordinator_emails = output.coordinatorEmails;
                (coordinator_emails.indexOf(user_email_id) >= 0) ? resolve({success: true, message: "Is a coordinator"}) : reject({success: false, message: "Not a coordinator"});
            }
        });
    });
};

// Controller for marking a participant as present in an event's session scannable
module.exports.scanQrAndMarkPresent = (scannable_id, participant_id) => {
    return new Promise((resolve, reject) => {
        ScannableTransactions.findScannableByScannableId(scannable_id, (err, outputScannable) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputScannable) {
                    reject({success: false, message: "No such scannable session exists"});
                } else {
                    let participants_obj_ids = outputScannable.participantsPresent;
                    if (participants_obj_ids.indexOf(participant_id) >= 0) {
                        reject({success: false, message: "Participant already scanned for this session"});
                    } else {
                        ScannableTransactions.addAParticipantToAScannable(scannable_id, participant_id, (err) => {
                            if (err) {
                                console.log(err);
                                reject({success: false, message: "An error occurred while marking as present"});
                            } else
                                resolve({success: true, message: "Participant marked present"});
                        });
                    }
                }
            }
        });
    });
};

// Controller for adding wifi coupon into a user's account if wifi coupon for that event is not present
// This controller will be added as the last promise to /coordinator/mark-attendance route
module.exports.checkAndAddWifiCoupon = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findWifiCoupons(user_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                let wifi_coupons = output.wifiCouponHistory;
                let coupon_exists = false;
                for (let i=wifi_coupons.length-1; i>=0; i--) {
                    if (event_id == wifi_coupons[i].event_id) {
                        coupon_exists = true;
                        break;
                    }
                }
                setTimeout(() => {
                    if (coupon_exists)
                        reject({success: false, message: "Wifi coupon already exists"});
                    else {
                        EventTransactions.findEventByEventIdWithoutPopulate(event_id, (err, output) => {
                            if (err) {
                                console.log(err);
                                reject({success: false, message: "An error occurred"});
                            } else {
                                let output_coupons = output.wifiCoupons;
                                let coupon_to_be_allocated = output_coupons[0];
                                let coupon_id = coupon_to_be_allocated.coupon_id;
                                let coupon_password = coupon_to_be_allocated.coupon_password;

                                output.wifiCoupons = output.wifiCoupons.slice(1);

                                output.save(err => {
                                    if (err) {
                                        console.log(err);
                                        reject({success: false, message: "An error occurred"});
                                    } else {
                                        UserTransactions.addWifiCoupon(user_id, coupon_id, coupon_password, event_id, (err) => {
                                            if (err) {
                                                console.log(err);
                                                reject({success: false, message: "An error occurred"});
                                            } else {
                                                resolve({success: true, message: "Wifi coupon added successfully"});
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }, 500);
            }
        });
    });
};