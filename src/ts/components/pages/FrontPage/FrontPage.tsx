import { observer } from "mobx-react";
import React from "react";

import { injectStore } from "src/ts/store/injectStore";
import { Store } from "src/ts/store/Store";

import { colors, fonts } from "src/ts/config";
import { Application } from "../../elements/Application/Application";

export type FrontPageProps = {
    /**
     * Contains a reference to the root sotre
     */
    store: Store;
}

/**
 * Frontpage responsible for rendered the welcome page that the user should be
 * presented to when navigation to the root of the application.
 */
@observer
class UnwrappedFrontPage extends React.Component<FrontPageProps> {
    /**
     * Main render method, used to render Frontpage
     */
    public render() : JSX.Element{
        return(
            <div>
                <h1>Recent applications</h1>
                <div className="list-of-applications">
                    { this.props.store.applications.map((application, index) => {
                        return <Application key={index} application={application}/>;
                    }) }
                </div>

                <style jsx>{`
                    h1{
                        /** Override defaults */
                        margin: 15px 15px 0;

                        /** Setup font */
                        font-family: ${ fonts.heading };
                        font-weight: 500;
                        line-height: 1;
                        margin-bottom: 10px;
                    }

                    .list-of-applications {
                        /** Temp dimensions of list */
                        width: 50%;
                        margin-bottom: 10px;

                        /**
                         * When the viewport gets too small, force rendering
                         * of applications to fill 100%
                         */
                        @media (max-width: 1100px) {
                            width: 100%;
                            max-width: 650px;
                            height: 100%;
                            margin: 0 auto 30px;
                        }

                        /** Apply custom scrollbar styling */
                        & ::-webkit-scrollbar {
                            width: 3px;
                        }

                        & ::-webkit-scrollbar-track {
                            background: rgba(56, 56, 56, 0.1);
                        }

                        & ::-webkit-scrollbar-thumb {
                            background: ${ colors.black };
                        }
                    }

                `}</style>
            </div>
        );
    }
}

export const FrontPage = injectStore((store) => ({store}), UnwrappedFrontPage);