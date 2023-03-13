<script>
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
  
    /**
     * @type {{ score: any; } | null}
     */
    let calculatedScore = null;
  
    const { form, isValid, errors, touched, handleChange, handleSubmit, handleReset } = createForm({
      initialValues: {
        temperature: "",
        heartRate: "",
        respiratoryRate: "",
      },
      validationSchema: yup.object().shape({
        temperature: yup.number().min(31).max(42).required(),
        heartRate: yup.number().min(25).max(220).required(),
        respiratoryRate: yup.number().min(3).max(60).required(),
      }),
      onSubmit: async (values) => {      
        try {
          const res = await fetch(
            "https://us-central1-jovial-beach-205515.cloudfunctions.net/calculateNewsScore",
            {
              method: "POST",
              body: JSON.stringify({
                measurements: [
                  { type: "TEMP", value: parseFloat(values.temperature) },
                  { type: "HR", value: parseFloat(values.heartRate) },
                  { type: "RR", value: parseFloat(values.respiratoryRate) },
                ],
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const score = await res.json();
          calculatedScore = score;
        } catch (err) {
          console.log(err);
        }
      },
    });
  
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <h2>NEWS score calculator</h2>
    <label for="temperature">
      <span>Body temperature</span>
      <span class="input-help">Degrees celcius</span>
      <input
        id="temperature"
        type="text"
        inputmode="decimal"      
        autocomplete="off"
        name="temperature"
        on:change={handleChange}
        bind:value={$form.temperature}
      />
      {#if $errors.temperature && $touched.temperature}
      <span>Enter a number between 31 and 42</span>
      {/if}
    </label>
    <label for="heartrate">
      <span>Heartrate</span>
      <span class="input-help">Beats per minute</span>
      <input
        id="heartrate"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        name="heartRate"
        on:change={handleChange}
        bind:value={$form.heartRate}
      />
      {#if $errors.heartRate && $touched.heartRate}
      <span>Enter a number between x and y</span>
      {/if}
    </label>
    <label for="respiratoryrate">
      <span>Respiratory rate</span>
      <span class="input-help">Breaths per minute</span>
      <input
        id="respiratoryrate"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        name="respiratoryRate"
        on:change={handleChange}
        bind:value={$form.respiratoryRate}
      />
      {#if $errors.respiratoryRate && $touched.respiratoryRate}
      <span>Enter a number between x and y</span>
      {/if}
    </label>
    <section class="btn-group">
      <button class="btn-primary" class:disabled={!$isValid} type="submit" disabled={!$isValid}>Calculate NEWS score</button>
      <button type="reset" on:click={handleReset}>Reset form</button>
    </section>
    {#if calculatedScore}
      <section class="hidden">
        News score: <span id="score">{calculatedScore.score}</span>
      </section>
    {/if}
  </form>
  
  <style>
    form {
      margin-top: 99px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-direction: column;
      gap: 38px;
      width: fit-content;
      min-width: 404px;
    }
  
    h2 {
      font-weight: 600;
      font-size: 1.25rem;
      line-height: 1.625;
    }
  
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      line-height: 1;
    }
  
    label span {
      font-weight: 600;
      font-size: 1rem;
    }
  
    label span.input-help {
      font-weight: 400;
      font-size: 0.875rem;
    }
  
    input {
      background: linear-gradient(
        0deg,
        var(--color-primary-transparent),
        var(--color-primary-light)
      );
      border: 1px solid hsla(266, 72%, 50%, 0.05);
      margin-top: 6px;
      padding: 10px 12px 10px 24px;
    }
  
    .btn-group {
      display: flex;
      gap: 24px;
    }
  
    button {
      font-weight: 400;
      font-size: 1rem;
      padding: 8px 16px;
      background-color: var(--color-primary-light);
      border-radius: 40px;
    }
  
    button.btn-primary {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  
    button.disabled {
      cursor: not-allowed;
    }
  </style>
  