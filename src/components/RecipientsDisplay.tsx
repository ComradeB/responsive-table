import { useEffect, useRef, useState } from "react";

export default function RecipientsDisplay({ recipients }: { recipients: string[] }) {

    let displayedRecipients = 0;
    let trimmedRecipients = recipients.length;
    let spanWidth = 0
    const [containerWidth, setContainerWidth] = useState(0);
    const row = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (row.current) {
                setContainerWidth(row.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    for (const recipient of recipients) {
        const span = document.createElement("span");
        span.textContent = recipient;
        document.body.appendChild(span);
        spanWidth += span.offsetWidth;
        document.body.removeChild(span);

        if (recipients.length > 1) spanWidth += 50

        if (spanWidth <= containerWidth) {
            displayedRecipients += 1
            trimmedRecipients -= 1
        } else break
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between"}} ref={row}>
            
            {displayedRecipients > 0 && trimmedRecipients >= 0
                ? <span>{recipients.slice(0, displayedRecipients).join(", ")}{trimmedRecipients === 0 ? "" : ", ..."}</span>
                : <span style={{marginRight: "auto"}}>...</span>
            }

            {displayedRecipients >= 0 && trimmedRecipients > 0 && recipients.length > 1
                ?
                <div>
                    <span style={{
                        fontSize: "16px",
                        backgroundColor: "#666666", 
                        color: "#f0f0f0", 
                        padding: "2px 5px", 
                        borderRadius: '3px',
                        marginLeft: "auto"
                    }}>
                    {displayedRecipients === 0
                    ? `+${trimmedRecipients-1}` 
                    : `+${trimmedRecipients}`}
                    </span>
                </div>
                : ""
            }
        </div>
    );
}