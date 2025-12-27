/* ====== phrases layout only ====== */

.phrases{
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* صف الجملة */
.phrase-row{
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 12px;
}

/* الإنجليزي */
.phrase-row .eng{
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  direction: ltr;
}

/* العربي */
.phrase-row .ara{
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  direction: rtl;
}

/* الأزرار */
.phrase-row .btns{
  display: flex;
  gap: 6px;
}

/* زر النطق (بدون ستايل شكلي) */
.speak-btn{
  padding: 4px 8px;
  font-size: .85rem;
  cursor: pointer;
}

/* زر كبير في الفوتر */
.speak-btn.large{
  margin-top: 8px;
}

/* ====== موبايل ====== */
@media (max-width: 768px){
  .phrase-row{
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .phrase-row .eng,
  .phrase-row .ara{
    text-align: center;
  }

  .phrase-row .btns{
    justify-content: center;
  }
    }
