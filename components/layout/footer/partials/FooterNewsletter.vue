<template>
  <div id="form-newsletter-footer" class="FooterNewsletter">
    <h4 class="pl-0 pr-4 has-text-secondary">
      {{ $t('FooterNewsletter.title') }}
    </h4>
    <p class="has-text-secondary">
      {{ $t('FooterNewsletter.description') }}
    </p>

    <GDPRModal :is-active="showGDPRModal" method="POST" :purpose="$t('gdpr.content.purpose.newsletter')" @submit="submitForm" @close="closeGDPRModal" />

    <div v-if="!isMessageSent">
      <div class="FooterNewsletter__form mt-4">
        <b-field :type="validations.email.status" :message="$t(validations.email.message)">
          <b-input v-model="email" :placeholder="$t('FooterNewsletter.email')" @focus="emailFocus" />
        </b-field>
        <b-field :type="validations.repeatEmail.status" :message="$t(validations.repeatEmail.message)">
          <b-input v-if="emailFocused" v-model="repeatEmail" :placeholder="$t('FooterNewsletter.confirmEmail')" />
        </b-field>
      </div>
      <b-button class="FooterNewsletter__form__button mt-3" :disabled="!validated" @click="subscribeToNewsletter">
        {{ $t('FooterNewsletter.send') }}
      </b-button>

      <div class="FooterNewsletter__share">
        <a
          title="Instagram"
          target="_blank"
          href="https://www.instagram.com/talkual"
        >
          <b-icon icon="instagram" />
        </a>
        <a
          title="Linkedin"
          target="_blank"
          href="https://www.linkedin.com/company/talkual"
        >
          <b-icon icon="linkedin" />
        </a>
        <a
          title="Facebook"
          target="_blank"
          href="https://www.facebook.com/talkualfoods"
        >
          <b-icon icon="facebook" />
        </a>
        <a
          title="Youtube"
          target="_blank"
          href="https://www.youtube.com/channel/UCu6BQidScrwfSP7xvtZc24Q"
        >
          <b-icon icon="youtube" />
        </a>
        <a
          title="Twitter"
          target="_blank"
          href="https://twitter.com/talkualfoods"
        >
          <b-icon icon="twitter" />
        </a>
        <a title="Tiktok" target="_blank" href="https://www.tiktok.com/@talkual">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 16 16"
          >
            <path
              d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
            />
          </svg>
        </a>
      </div>
    </div>
    <div v-else class="FooterNewsletter__message-sent">
      <p>
        {{ $t('FooterNewsletter.messageSent') }}
      </p>
    </div>
  </div>
</template>

<script>
import { isValidated, isValidEmail, isValidString } from 'assets/js/validations';

export default {
  name: 'FooterNewsletter',
  data() {
    return {
      email: '',
      repeatEmail: '',
      emailFocused: false,
      formTouched: false,
      showGDPRModal: false,
      marketingInfoComm: false,
      talkualLegalBasis: false,
      isMessageSent: false,
      validations: {
        email: {
          status: '',
          message: ''
        },
        repeatEmail: {
          status: '',
          message: ''
        }
      }
    }
  },
  computed: {
    validated() {
      if (!this.formTouched) {
        return true
      }
      return isValidated(this.validations)
    }
  },
  watch: {
    name(name) {
      this.validations.name = this.formTouched && isValidString(name, false, 1)
      this.formTouched = true
    },
    email(email) {
      this.formTouched = true
      this.validations.email = this.formTouched && isValidEmail(email)
      if (this.validations.email.status === 'is-success') {
        this.validateEmailsMatch()
      }
    },
    repeatEmail(repeatEmail) {
      this.formTouched = true
      this.validations.repeatEmail = this.formTouched && isValidEmail(repeatEmail)
      if (this.validations.repeatEmail.status === 'is-success') {
        this.validateEmailsMatch()
      }
    }
  },
  methods: {
    subscribeToNewsletter() {
      this.showGDPRModal = true
    },
    emailFocus() {
      this.emailFocused = true
    },
    resetForm() {
      this.email = ''
      this.repeatEmail = ''
      this.emailFocused = false
      this.formTouched = false
      this.marketingInfoComm = false
      this.talkualLegalBasis = false
      this.validations = {
        name: {
          status: '',
          message: ''
        },
        email: {
          status: '',
          message: ''
        },
        repeatEmail: {
          status: '',
          message: ''
        }
      }
    },
    closeGDPRModal() {
      this.showGDPRModal = false
    },
    submitForm(dataGDPR) {
      this.$strapi.$http.$post('/hubspot/marketing-communications', {
        email: this.email,
        marketingInfoComm: dataGDPR.marketingInfoComm ? 'yes' : 'no',
        talkualLegalBasis: dataGDPR.talkualLegalBasis ? 'freelyGivenConsentFromContact' : '',
        language: this.$i18n.locale
      })
        .then(() => {
          this.isMessageSent = true
        })
        .catch((error) => {
          console.error(error)
        })
      this.closeGDPRModal()
      this.resetForm()
    },
    validateEmailsMatch() {
      if (this.email !== this.repeatEmail) {
        this.validations.repeatEmail.status = 'is-danger'
        this.validations.repeatEmail.message = this.$t('FooterNewsletter.emailsNotMatch')
      } else {
        this.validations.repeatEmail.status = 'is-success'
        this.validations.repeatEmail.message = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.FooterNewsletter {
  font-family: "Solina Extended Book", serif;
  font-size: 18px;

  > h4 {
    font-weight: 700;
    margin-top: .5rem;
    margin-bottom: .75rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    font-size: 24px;
    font-family: 'Solina Condensed', serif;
  }

  > p {
    font-family: 'Solina Extended Book', serif;
    font-size: 16px;
  }

  &__message-sent {
    margin-top: 50px;
    color: $secondary;
  }

  &__form {
    ::v-deep input {
      color: $secondary;
      border: none;
      background-color: transparent;
      height: 100%;
      border-bottom: 1px solid $secondary;
      border-radius: 0;
      padding-left: 0;
      margin-top: 10px;
      margin-bottom: 10px;
      font-family: 'Solina Extended Book', serif;
      font-size: 16px;

      &::placeholder {
        color: $secondary;
      }

      &:focus {
        border-color: $primary;
        color: $primary;

        &::placeholder {
          color: $primary;
        }
      }
    }

    &__button {
      background-color: transparent;
      border-width: 0;
      font-size: 18px;
      //padding-left: 0;
      position: relative;
      cursor: pointer;
      transition: .5s;
      padding: 0;

      &:active,
      &:focus{
        outline: 0;
      }

      > ::v-deep span {
        color: $secondary;
      }

      &:hover {
        color: $primary;

        &::after {
          content: '';
          display: block;
          height: 1px;
          width: 0;
          background-color: $primary;
          position: absolute;
          bottom: 0;
          left: 0;
          animation: textUnderlineAnimation .25s linear forwards;
        }
      }

      @keyframes textUnderlineAnimation {
        from {
          width: 0;
          opacity: 0;
        }
        to {
          width: 100%;
          opacity: 1;
        }
      }

      &:focus {
        outline: 0 !important;
      }
    }
  }

  &__share {
    a {
      color: $secondary;
      margin-right: 0.5rem;
      transition: 0.15s;

      &:last-child {
        margin-right: 0;
      }

      svg {
        fill: $secondary;
      }

      &:hover {
        color: $primary;
        svg {
          fill: $primary;
        }
      }
    }
  }

  @media (min-width: $tablet) {
    display: flex;
    flex-direction: column;
    flex: 1;

    > h4 {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    > div {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: flex-start;
    }

    &__share {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      gap: 20px;

      svg {
        width: 22px;
        height: 22px;
        position: relative;
      }

      a {
        align-self: flex-end;
        ::v-deep i:before {
          font-size: 30px;
        }
      }
    }

  }

}
</style>
