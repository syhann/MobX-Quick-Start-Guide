import React, { Fragment } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { inject, observer, Observer } from 'mobx-react';

export function OperationStatus({ state, render }) {
    switch (state) {
        case 'pending':
            return <CircularProgress variant={'indeterminate'} />;

        case 'completed':
            return render();
        case 'failed':
            return <Typography color={'accent'}>Operation Failed</Typography>;
        default:
            return null;
    }
}

@inject('store')
@observer
export class TemplateStepComponent extends React.Component {
    static defaultProps = {
        title: 'Step Title',
        operationTitle: 'Operation',
        renderDescription: () => 'Some Description',
    };

    render() {
        const { title, operationTitle, renderDescription } = this.props;
        const {
            step: { loadState, operationState, perform },
        } = this.props.store;

        return (
            <Fragment>
                <Typography
                    variant={'headline'}
                    style={{ textAlign: 'center' }}
                >
                    {title}
                </Typography>

                <Observer>
                    {() => (
                        <OperationStatus
                            state={loadState}
                            render={() => (
                                <div style={{ padding: '2rem 0' }}>
                                    {renderDescription()}
                                </div>
                            )}
                        />
                    )}
                </Observer>

                <Grid justify={'center'} container>
                    <Observer>
                        {() => (
                            <Button
                                variant={'raised'}
                                color={'primary'}
                                disabled={operationState === 'pending'}
                                onClick={perform}
                            >
                                {operationTitle}
                                {operationState === 'pending' ? (
                                    <CircularProgress
                                        variant={'indeterminate'}
                                        size={20}
                                        style={{
                                            color: 'black',
                                            marginLeft: 10,
                                        }}
                                    />
                                ) : null}
                            </Button>
                        )}
                    </Observer>
                </Grid>
            </Fragment>
        );
    }
}

export function ShoppingDescription() {
    return (
        <Typography color={'secondary'}>
            Welcome to the MobX Shop. You will find a variety of products to
            help you adopt the <strong>MobX</strong> way of life :-).
        </Typography>
    );
}

export function PaymentDescription() {
    return (
        <Typography color={'primary'} component={'div'}>
            You can pay in <strong>kind</strong> or <strong>cash</strong>.
            <ul>
                <li>For cash payments, we accept Credit/Debit Cards</li>
                <li>If paying in kind, just spread the MobX lifestyle</li>
            </ul>
        </Typography>
    );
}

export function ConfirmDescription() {
    return (
        <Typography color={'primary'}>
            Congratulations! Your <strong>MobX-infused</strong> order is on its
            way.
        </Typography>
    );
}

export function TrackOrderDescription() {
    return (
        <Fragment>
            <Typography color={'primary'} variant={'subheading'}>
                We are preparing your order. You can track its status here.
            </Typography>
            <Typography color={'primary'} style={{ marginTop: 20 }}>
                Oh! Why stop at just the purchased products. There is lot more
                goodness in the MobX shop. Continue the exploration.
            </Typography>
        </Fragment>
    );
}