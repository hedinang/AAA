import { useRef, useEffect } from 'react';

const GoogleSSO = () => {

    const g_sso = useRef(null);

    useEffect(() => {
        if (g_sso.current) {
            window.google.accounts.id.initialize({
                client_id: "399731219295-42coi6p2nb4jo4atjnivqk0ak6c989u7.apps.googleusercontent.com",
                secret: '9518596a-4df8-4e1c-afae-b3039eaff01e',
                ux_mode: "redirect",
                callback: (res, error) => {
                    if (error) {
                        console.log(error)
                    }
                    console.log('A== ' + res)
                },
                // allowed_parent_origin: "localhost:3000/login"
            });
            window.google.accounts.id.renderButton(g_sso.current, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: '220',
            });
            // window.google.accounts.id.renderButton(
            //     document.getElementById("buttonDiv"),
            //     { theme: "outline", size: "large" }  // customization attributes
            // );
            window.google.accounts.id.prompt(); // also display the On
        }
    }, [g_sso.current]);


    return (<div ref={g_sso} />);
}


export default GoogleSSO 