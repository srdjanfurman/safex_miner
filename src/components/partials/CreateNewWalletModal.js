import React from "react";

export default class CreateNewWalletModal extends React.Component {
    render() {
        return (
            <div>
                <div className={this.props.createNewWalletModal
                    ? 'modal createNewWalletModal active'
                    : 'modal createNewWalletModal'}>
                    <div className="sendModalInner">
                        <span className="close" onClick={this.props.closeNewWalletModal}>X</span>
                        <h3>Create New Wallet File</h3>

                        <form onSubmit={this.props.createNewWallet}>
                            <label htmlFor="path">Wallet Path</label>
                            <input name="path" value={this.props.walletPath} placeholder="Your Wallet Path" />

                            <label htmlFor="pass1">Enter New Password</label>
                            <input name="pass1" placeholder="New Password" />

                            <label htmlFor="pass1">Repeat Password</label>
                            <input name="pass2" placeholder="Repeat Password" />

                            <button type="submit" className="button-shine new-wallet-btn">
                                Create New Wallet
                            </button>
                        </form>
                    </div>
                </div>

                <div className={this.props.createNewWalletModal
                    ? 'backdrop active'
                    : 'backdrop'} onClick={this.props.closeNewWalletModal}>
                </div>
            </div>
        );
    }
}