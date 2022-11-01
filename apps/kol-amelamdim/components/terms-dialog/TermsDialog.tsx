import React, { useState } from 'react';
import { Button, Dialog, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { pdfjs, Document, Page } from 'react-pdf';
import { i18n, useTranslation } from 'next-i18next';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface TermsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsDialog = ({ isOpen, onClose }: TermsDialogProps) => {
  const { t } = useTranslation('register');

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (offSet) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  };
  const changePageBack = () => {
    handlePageChange(-1);
  };
  const changePageNext = () => {
    handlePageChange(1);
  };

  return (
    <Dialog open={isOpen}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Document
        file={
          i18n.language === 'en' ? '../files/terms.pdf' : './files/terms.pdf'
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Grid container justifyContent="center">
        {pageNumber > 1 && (
          <Button onClick={changePageBack}>{t('previous-page')}</Button>
        )}
        {pageNumber < numPages && (
          <Button onClick={changePageNext}>{t('next-page')}</Button>
        )}
      </Grid>
      <Typography component="h4">
        {t('page')} {pageNumber} {t('of')} {numPages}
      </Typography>
    </Dialog>
  );
};

export default TermsDialog;
