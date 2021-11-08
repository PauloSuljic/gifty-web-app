import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const CalendarPage = ({user}) => {

    const locales = {
        "hr": require("date-fns/locale/hr")
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    const [counter, setCounter] = useState(0);
    const [birthdays, setBirthdays] = useState([]);
    const [thisMonthBirthdays, setThisMonthBirthdays] = useState([]);
    

    useEffect(() => {

        let isMounted = true;
        
        const fetchFriends = async() => {
            const fdata = await fetch('http://localhost:5000/api/friendships');
            const friendships = await fdata.json();
            
            const udata = await fetch('http://localhost:5000/api/users');
            const users = await udata.json();
            
            const friends = []
            
            // Pending Friendships 
            const filteredFriendships = friendships.filter(friendship => 
                (friendship.RequestReceiver === user.UserId || friendship.RequestSender === user.UserId)
                && (friendship.StatusReceiver === true && friendship.StatusSender === true));

            filteredFriendships.forEach((friendship) => {
                if (user.UserId === friendship.RequestSender){
                    friends.push(users.find(
                        user => user.UserId === friendship.RequestReceiver  
                    ));
                }else{
                    friends.push(users.find(
                        user => user.UserId === friendship.RequestSender  
                    ));
                }
            });

            localStorage.setItem('friends', JSON.stringify(friends));

            const birthdays2 = []
            const upcoming = []
            friends.forEach(friend => {
                const str = friend.DateOfBirth;
                const date = new Date(str);
                const month = date.getMonth()+1;
                const day = date.getDate();
                let year = "";

                if((month === new Date().getMonth()+1) || (month > new Date().getMonth()+1)){
                    year = new Date().getFullYear();  
                }else{
                    year = new Date().getFullYear()+1;
                }

                
                const birthday = {
                    title: friend.Username,
                    allDay: true,
                    start: year+"/"+month+"/"+day,
                    end: year+"/"+month+"/"+day
                }
                
                birthdays2.push(birthday)
                
                if(month === new Date().getMonth()+1){
                    upcoming.push(birthday)
                    setCounter(previous => previous + 1)
                }
            })
            
            setBirthdays(birthdays2)
            setThisMonthBirthdays(upcoming)   
        }   

        if (isMounted){
            fetchFriends()

        }
        
        return () => {
            isMounted = false;
        } 
    },[user.UserId])

    return(
        <>
        <div className="calendar">
            <Calendar 
                localizer={localizer} 
                events={birthdays}
                startAccessor="start" 
                endAccessor="end" 
                style={{height: 500, width: 700, margin: "50px"}}
                views={{
                    month: true
                }}
            />

            <div className="birthday-sidebar-list">
            <h1>{counter}</h1>
            <h4>Upcoming Birthdays This Month</h4>
            <br/>
                {thisMonthBirthdays.map((birthday,index) => (
                <Row key={index}>
                    <Col >
                        {birthday.title} 
                    </Col>
                    <Col >
                        {birthday.start}
                    </Col>
                </Row>
                ))}
            </div>
        </div>
        </>
    )
}

export default CalendarPage