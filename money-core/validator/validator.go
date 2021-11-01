package validator

type Validator struct {
	AuthValidator           AuthValidatorInterface
	ForgotPasswordValidator ForgotPasswordValidatorInterface
	WalletValidator         WalletValidatorInterface
}
